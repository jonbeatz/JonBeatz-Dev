# J.A.R.V.I.S. TTS — OmniVoice default (see jarvis-voice.ps1)
# -Quick is deprecated; use -EdgeOnly to force Ryan backup engine only.
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Text,
    [switch]$Quick,
    [switch]$EdgeOnly,
    [switch]$Quiet
)

$voiceScript = Join-Path $PSScriptRoot 'jarvis-voice.ps1'
$args = @('-File', $voiceScript, $Text)
if ($Quick) { $args += '-Quick' }
if ($EdgeOnly) { $args += '-EdgeOnly' }
if ($Quiet) { $args += '-Quiet' }
& powershell -NoProfile -ExecutionPolicy Bypass @args
exit $LASTEXITCODE
