# Shared voice policy gate — when JARVIS may speak aloud.
param(
    [Parameter(Mandatory = $true)]
    [string]$Text,
    [ValidateSet('ritual', 'explicit', 'error')]
    [string]$Context = 'explicit',
    [switch]$Quiet
)

$Root = Split-Path $PSScriptRoot -Parent
$VoiceScript = Join-Path $PSScriptRoot 'jarvis-voice.ps1'

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

Import-JonBeatzEnv

if (-not $Text.Trim()) { return }

$policy = if ($env:JARVIS_VOICE_POLICY) { $env:JARVIS_VOICE_POLICY.Trim().ToLower() } else { 'ritual' }
$errorsOn = if ($null -eq $env:JARVIS_VOICE_ERRORS) { '1' } else { $env:JARVIS_VOICE_ERRORS.Trim() }

$allowed = switch ($Context) {
    'ritual' { $policy -ne 'off' }
    'explicit' { $policy -ne 'off' }
    'error' { $errorsOn -eq '1' -and $policy -ne 'off' }
    default { $false }
}

if (-not $allowed) { return }

$args = @('-File', $VoiceScript, $Text)
if ($Quiet) { $args += '-Quiet' }
& powershell -NoProfile -ExecutionPolicy Bypass @args
