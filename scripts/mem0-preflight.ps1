# Mem0 LM Studio preflight (JonBeatz.dev project).
# Keeps whatever model is loaded (shared :1234 with Hermes); only loads a
# default if nothing is loaded. Does NOT swap away from the active model.
param(
    [switch]$Quiet
)

$ErrorActionPreference = 'Continue'

$loadEnv = Join-Path $PSScriptRoot 'load-env.ps1'
if (Test-Path $loadEnv) { . $loadEnv | Out-Null }

$PreferredModel = if ($env:HERMES_LM_MODEL) { $env:HERMES_LM_MODEL } elseif ($env:LMSTUDIO_MODEL) { $env:LMSTUDIO_MODEL } else { 'qwen3-4b-instruct-2507' }
$LoadContext = if ($env:HERMES_LM_CONTEXT) { [int]$env:HERMES_LM_CONTEXT } else { 81920 }
$LoadParallel = if ($env:HERMES_LM_PARALLEL) { [int]$env:HERMES_LM_PARALLEL } else { 2 }
$LmsApi = 'http://127.0.0.1:1234/v1/models'

function Write-Mem0Log {
    param([string]$Message, [string]$Color = 'Cyan')
    if (-not $Quiet) { Write-Host "[JBdev:Mem0] $Message" -ForegroundColor $Color }
}

if (-not (Get-Command lms -ErrorAction SilentlyContinue)) {
    Write-Mem0Log 'lms CLI not found. Install LM Studio and ensure lms is on PATH.' 'Red'
    exit 1
}

function Get-LoadedLlmState {
    $raw = & lms ps --json 2>&1
    if ($LASTEXITCODE -ne 0 -or -not $raw) { return $null }
    try {
        $items = $raw | ConvertFrom-Json
        if (-not $items) { return $null }
        if ($items -is [System.Array]) {
            return @($items | Where-Object { $_.type -eq 'llm' } | Select-Object -First 1)
        }
        return $items
    } catch { return $null }
}

function Wait-LmsApi {
    param([int]$MaxSeconds = 30)
    $deadline = (Get-Date).AddSeconds($MaxSeconds)
    while ((Get-Date) -lt $deadline) {
        try { $null = Invoke-RestMethod -Uri $LmsApi -TimeoutSec 3; return $true }
        catch { Start-Sleep -Seconds 1 }
    }
    return $false
}

$loaded = Get-LoadedLlmState

if ($loaded) {
    Write-Mem0Log "Using loaded model: $([string]$loaded.identifier) (no swap - shared with Hermes)." 'Green'
} else {
    Write-Mem0Log "No model loaded. Loading $PreferredModel..." 'Yellow'
    & lms load $PreferredModel -c $LoadContext --parallel $LoadParallel 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) { Write-Mem0Log "Failed to load a model for Mem0." 'Red'; exit 1 }
    $loaded = Get-LoadedLlmState
    Write-Mem0Log "Loaded $($loaded.identifier)." 'Green'
}

if (-not (Wait-LmsApi)) {
    Write-Mem0Log "LM Studio API not responding at $LmsApi" 'Red'
    exit 1
}

if ($loaded) {
    $sizeGb = [math]::Round([double]$loaded.sizeBytes / 1GB, 2)
    Write-Mem0Log "Ready: $($loaded.identifier) | context $($loaded.contextLength) | parallel $($loaded.parallel) | weights ~${sizeGb} GB" 'Green'
}

exit 0
