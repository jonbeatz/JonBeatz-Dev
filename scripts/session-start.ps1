# JonBeatz.dev session start - lightweight site-project warmup.
# No DeepSeek/Telegram/voice/ComfyUI (those are JonBeatz personal-profile only).
param(
    [switch]$SkipMem0,
    [switch]$Quiet
)

$ErrorActionPreference = 'Continue'
$Tag = '[JBdev Session]'
$Root = Split-Path $PSScriptRoot -Parent

$loadEnv = Join-Path $PSScriptRoot 'load-env.ps1'
if (Test-Path $loadEnv) { . $loadEnv | Out-Null }

function Test-Port {
    param([int]$Port)
    return [bool](Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)
}

Write-Host ''
Write-Host "$Tag Starting JonBeatz.dev site session..." -ForegroundColor Red
Write-Host ''

if (-not $SkipMem0) {
    $preflight = Join-Path $PSScriptRoot 'mem0-preflight.ps1'
    if (Test-Path $preflight) {
        Write-Host "$Tag Mem0 preflight (LM Studio)..." -ForegroundColor Gray
        $preArgs = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', $preflight)
        if ($Quiet) { $preArgs += '-Quiet' }
        & powershell @preArgs
        if ($LASTEXITCODE -ne 0) {
            Write-Host "$Tag Mem0 preflight failed - add/search unavailable until LM Studio is up." -ForegroundColor Yellow
        }
    }
}

Write-Host ''
Write-Host "$Tag Service probes:" -ForegroundColor Cyan
$devUp = Test-Port -Port 3000
Write-Host ("  {0,-18} :{1,-5} {2}" -f 'Dev site', 3000, $(if ($devUp) { 'online' } else { 'offline (npm run dev)' })) -ForegroundColor $(if ($devUp) { 'Green' } else { 'DarkGray' })
$lmsUp = Test-Port -Port 1234
Write-Host ("  {0,-18} :{1,-5} {2}" -f 'LM Studio', 1234, $(if ($lmsUp) { 'online' } else { 'offline' })) -ForegroundColor $(if ($lmsUp) { 'Green' } else { 'DarkGray' })

Write-Host ''
Write-Host "$Tag Project root: $Root" -ForegroundColor DarkGray
Write-Host "$Tag Read .cursor/docs/START-HERE.md + ReCall.md to resume." -ForegroundColor DarkGray
Write-Host "$Tag Session start complete." -ForegroundColor Green
Write-Host ''
exit 0
