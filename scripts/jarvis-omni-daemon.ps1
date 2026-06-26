# Ensure OmniVoice daemon is running (warm model for fast jarvis:speak).
param(
    [switch]$Stop,
    [switch]$Quiet
)

$ErrorActionPreference = 'Continue'
$Tag = '[OmniVoice Daemon]'
$VoiceEngine = 'D:\Hermes\projects\_core-scripts\voice-engine'
$JonBeatzRoot = Split-Path $PSScriptRoot -Parent
$OmniPython = if ($env:OMNIVOICE_PYTHON) { $env:OMNIVOICE_PYTHON } else { 'D:\Hermes\apps\OmniVoice\.venv\Scripts\python.exe' }
$Port = if ($env:JARVIS_OMNI_PORT) { [int]$env:JARVIS_OMNI_PORT } else { 18776 }

function Import-JonBeatzEnv {
    $envFile = Join-Path $JonBeatzRoot '.env.local'
    if (-not (Test-Path $envFile)) { return }
    Get-Content $envFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -eq '' -or $line.StartsWith('#')) { return }
        if ($line -match '^\s*([^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim().Trim('"').Trim("'")
            Set-Item -Path "Env:$name" -Value $value
        }
    }
}

Import-JonBeatzEnv

function Write-Step([string]$Msg, [string]$Color = 'Gray') {
    if (-not $Quiet) { Write-Host "$Tag $Msg" -ForegroundColor $Color }
}

if ($Stop) {
    $conns = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    foreach ($c in $conns) {
        if ($c.OwningProcess) {
            Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
            Write-Step "Stopped PID $($c.OwningProcess) on :$Port" 'Yellow'
        }
    }
    exit 0
}

try {
    $health = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/health" -TimeoutSec 2
    if ($health.ok) {
        Write-Step "Already online on :$Port (model_loaded=$($health.model_loaded))" 'Green'
        exit 0
    }
} catch {}

if (-not (Test-Path $OmniPython)) {
    Write-Step "FAIL: OmniVoice python not found at $OmniPython" 'Red'
    exit 1
}

$daemon = Join-Path $VoiceEngine 'omnivoice_daemon.py'
if (-not (Test-Path $daemon)) {
    Write-Step "FAIL: $daemon missing" 'Red'
    exit 1
}

Write-Step "Starting daemon on :$Port (model load may take ~15s)..." 'Cyan'
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
[void][System.Diagnostics.Process]::Start($psi)

$deadline = (Get-Date).AddSeconds(120)
while ((Get-Date) -lt $deadline) {
    Start-Sleep -Seconds 2
    try {
        $health = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/health" -TimeoutSec 2
        if ($health.ok) {
            Write-Step "Online - model_loaded=$($health.model_loaded)" 'Green'
            exit 0
        }
    } catch {}
}

Write-Step 'FAIL: daemon did not become ready in 120s' 'Red'
exit 1
