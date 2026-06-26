# JARVIS voice router - OmniVoice (default) with Edge Ryan fallback.
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Text,
    [switch]$Quick,
    [switch]$EdgeOnly,
    [switch]$Quiet
)

$ErrorActionPreference = 'Continue'
$Tag = '[J.A.R.V.I.S.]'
$Root = Split-Path $PSScriptRoot -Parent
$VoiceEngine = 'D:\Hermes\projects\_core-scripts\voice-engine'
$OmniPython = if ($env:OMNIVOICE_PYTHON) { $env:OMNIVOICE_PYTHON } else { 'D:\Hermes\apps\OmniVoice\.venv\Scripts\python.exe' }
$HermesPython = Join-Path $env:LOCALAPPDATA 'hermes\hermes-agent\venv\Scripts\python.exe'
$HermesRoot = Join-Path $env:LOCALAPPDATA 'hermes\hermes-agent'
$OmniPort = if ($env:JARVIS_OMNI_PORT) { [int]$env:JARVIS_OMNI_PORT } else { 18776 }

function Import-JonBeatzEnv {
    $envFile = Join-Path $Root '.env.local'
    if (-not (Test-Path $envFile)) { return }
    Get-Content $envFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -eq '' -or $line.StartsWith('#')) { return }
        if ($line -match '^\s*([^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim().Trim('"').Trim("'")
            if (-not (Get-Item -Path "Env:$name" -ErrorAction SilentlyContinue)) {
                Set-Item -Path "Env:$name" -Value $value
            }
        }
    }
}

function Write-VoiceLog([string]$Msg, [string]$Color = 'Gray') {
    if (-not $Quiet) { Write-Host "$Tag $Msg" -ForegroundColor $Color }
}

function Test-OmniDaemon {
    try {
        $r = Invoke-RestMethod -Uri "http://127.0.0.1:$OmniPort/health" -TimeoutSec 2
        return [bool]$r.ok
    } catch {
        return $false
    }
}

function Start-OmniDaemon {
    if (-not (Test-Path $OmniPython)) { return $false }
    $daemon = Join-Path $VoiceEngine 'omnivoice_daemon.py'
    if (-not (Test-Path $daemon)) { return $false }

    Write-VoiceLog 'Starting OmniVoice daemon (first speak loads model ~15s)...' 'Yellow'
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = $OmniPython
    $psi.Arguments = "`"$daemon`""
    $psi.WorkingDirectory = $VoiceEngine
    $psi.WindowStyle = [System.Diagnostics.ProcessWindowStyle]::Hidden
    $psi.CreateNoWindow = $true
    $psi.UseShellExecute = $false
    foreach ($name in @('JARVIS_OMNI_STEPS','JARVIS_OMNI_STEPS_MEDIUM','JARVIS_OMNI_STEPS_LONG','JARVIS_OMNI_GUIDANCE','JARVIS_OMNI_INSTRUCT','JARVIS_OMNI_PORT','JARVIS_OMNI_MIN_STD','JARVIS_OMNI_MIN_PEAK')) {
        $val = [Environment]::GetEnvironmentVariable($name)
        if ($val) { $psi.EnvironmentVariables[$name] = $val }
    }
    $omniPy = [Environment]::GetEnvironmentVariable('OMNIVOICE_PYTHON')
    if ($omniPy) { $psi.EnvironmentVariables['OMNIVOICE_PYTHON'] = $omniPy }
    [void][System.Diagnostics.Process]::Start($psi)

    $deadline = (Get-Date).AddSeconds(120)
    while ((Get-Date) -lt $deadline) {
        Start-Sleep -Seconds 2
        if (Test-OmniDaemon) { return $true }
    }
    return $false
}

function Invoke-PlayAudio([string]$Path) {
    if (-not (Test-Path $Path)) { throw "Audio file missing: $Path" }
    # Windows native player — reliable for OmniVoice PCM16 (Hermes sounddevice can glitch)
    Add-Type -AssemblyName System.Windows.Forms
    $player = New-Object System.Media.SoundPlayer $Path
    $player.PlaySync()
}

function Invoke-OmniVoice {
    param([string]$SayText, [switch]$FreshDaemon)

    if ($FreshDaemon -or -not (Test-OmniDaemon)) {
        if (Test-OmniDaemon) {
            & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'jarvis-omni-daemon.ps1') -Stop -Quiet | Out-Null
            Start-Sleep -Seconds 1
        }
        if (-not (Start-OmniDaemon)) {
            throw 'OmniVoice daemon unavailable'
        }
    } elseif (-not (Test-OmniDaemon)) {
        if (-not (Start-OmniDaemon)) {
            throw 'OmniVoice daemon unavailable'
        }
    }

    $body = @{ text = $SayText } | ConvertTo-Json -Compress
    $res = Invoke-RestMethod -Uri "http://127.0.0.1:$OmniPort/speak" -Method Post -Body $body -ContentType 'application/json' -TimeoutSec 180
    if (-not $res.ok) { throw ($res.error | Out-String) }

    if ($res.std -and [double]$res.std -lt 0.03) {
        Write-VoiceLog "WARN: weak audio (std=$($res.std)) - restarting daemon and retrying once" 'Yellow'
        & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'jarvis-omni-daemon.ps1') -Stop -Quiet | Out-Null
        Start-Sleep -Seconds 1
        if (-not (Start-OmniDaemon)) { throw 'OmniVoice daemon restart failed' }
        $res = Invoke-RestMethod -Uri "http://127.0.0.1:$OmniPort/speak" -Method Post -Body $body -ContentType 'application/json' -TimeoutSec 180
        if (-not $res.ok) { throw ($res.error | Out-String) }
    }

    Invoke-PlayAudio -Path $res.file_path
    return @{ success = $true; provider = 'omnivoice'; file_path = $res.file_path }
}

function Invoke-EdgeRyan {
    param([string]$SayText)
    if (-not (Test-Path $HermesPython)) { throw 'Hermes Python missing for Edge TTS' }

    $env:JARVIS_SPEAK_TEXT = $SayText
    $result = & $HermesPython -c @"
import json, logging, os, subprocess, sys
logging.getLogger('tools.tts_tool').setLevel(logging.ERROR)
sys.path.append(r'$HermesRoot')
from tools.tts_tool import text_to_speech_tool

text = os.environ.get('JARVIS_SPEAK_TEXT', '').strip()
subprocess.run(['hermes', 'config', 'set', 'tts.provider', 'edge'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
subprocess.run(['hermes', 'config', 'set', 'tts.edge.voice', 'en-GB-RyanNeural'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
res = json.loads(text_to_speech_tool(text))
if not res.get('success'):
    print(json.dumps(res))
    sys.exit(1)
print(json.dumps({'success': True, 'provider': 'edge', 'file_path': res.get('file_path')}))
"@ 2>&1
    Remove-Item Env:JARVIS_SPEAK_TEXT -ErrorAction SilentlyContinue

    if ($LASTEXITCODE -ne 0) { throw ($result | Out-String) }
    $parsed = $result | ConvertFrom-Json
    Invoke-PlayAudio -Path $parsed.file_path
    return @{ success = $true; provider = $parsed.provider; file_path = $parsed.file_path }
}

Import-JonBeatzEnv

if ($EdgeOnly -or ($Quick -and $env:JARVIS_VOICE_FORCE_EDGE -eq '1')) {
    $VoiceMode = 'edge'
} elseif ($env:JARVIS_VOICE) {
    $VoiceMode = $env:JARVIS_VOICE.Trim().ToLower()
} else {
    $VoiceMode = 'omnivoice'
}
$Fallback = if ($env:JARVIS_VOICE_FALLBACK) { $env:JARVIS_VOICE_FALLBACK.Trim().ToLower() } else { 'edge' }

if (-not $Text.Trim()) {
    Write-Warning "$Tag No text provided."
    exit 1
}

$providers = @($VoiceMode)
if ($Fallback -and $Fallback -ne $VoiceMode) { $providers += $Fallback }

foreach ($provider in $providers) {
    try {
        if ($provider -eq 'omnivoice') {
            if (-not (Test-Path $OmniPython)) { throw 'OmniVoice python not found' }
            $out = Invoke-OmniVoice -SayText $Text
        } elseif ($provider -eq 'edge') {
            $out = Invoke-EdgeRyan -SayText $Text
        } else {
            throw "Unknown JARVIS_VOICE: $provider"
        }
        Write-VoiceLog "Voice active ($($out.provider))." 'Green'
        exit 0
    } catch {
        Write-VoiceLog "WARN: $provider failed - $($_.Exception.Message)" 'Yellow'
    }
}

Write-Warning "$Tag All voice providers failed."
exit 1
