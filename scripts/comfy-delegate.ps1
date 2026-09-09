# comfy-delegate.ps1 - Run shared MSC ComfyUI scripts from this Hermes profile
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('start', 'stop', 'restart', 'status', 'lowvram')]
    [string]$Action,
    [switch]$Force,
    [switch]$NoVRAMCheck,
    [switch]$LowVram,
    [switch]$UnloadLMStudio
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path $PSScriptRoot -Parent
$loadEnv = Join-Path $PSScriptRoot 'load-env.ps1'
if (Test-Path $loadEnv) { & $loadEnv -Root $Root | Out-Null }

$mscScripts = $env:MSC_COMFY_SCRIPTS
if (-not $mscScripts) {
    $mscScripts = 'D:\Cursor_Projectz\MyStudioChannel\.cursor\custom-scriptz'
}

$map = @{
    start    = 'start-comfyui.ps1'
    stop     = 'stop-comfyui.ps1'
    restart  = 'restart-comfyui.ps1'
    lowvram  = 'start-comfyui-lowvram.ps1'
}

if ($Action -eq 'status') {
    $psm1 = Join-Path $mscScripts 'lib\comfyui-state.psm1'
    if (-not (Test-Path $psm1)) {
        Write-Error "ComfyUI module not found: $psm1"
    }
    Import-Module $psm1 -Force
    Get-ComfyUiState | ConvertTo-Json -Depth 5
    exit 0
}

$scriptName = $map[$Action]
$scriptPath = Join-Path $mscScripts $scriptName
if (-not (Test-Path $scriptPath)) {
    Write-Error "ComfyUI script not found: $scriptPath"
}

$argsList = @()
if ($Action -eq 'start') {
    if ($Force) { $argsList += '-Force' }
    if ($NoVRAMCheck) { $argsList += '-NoVRAMCheck' }
    if ($LowVram) { $argsList += '-LowVram' }
    if ($UnloadLMStudio) { $argsList += '-UnloadLMStudio' }
}

& powershell -NoProfile -ExecutionPolicy Bypass -File $scriptPath @argsList
exit $LASTEXITCODE
