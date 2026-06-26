# JonBeatz.dev site Mem0 wrapper (scoped to jonbeatz_dev collection).
param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("add", "search", "list", "delete")]
    [string]$Action,

    [Parameter(Mandatory=$false)]
    [string]$Text,

    [Parameter(Mandatory=$false)]
    [string]$Query,

    [Parameter(Mandatory=$false)]
    [string]$Id,

    [switch]$SkipPreflight,

    [switch]$Infer
)

$pythonPath = if (Test-Path "C:\Users\JONBEATZ\AppData\Local\Programs\Python\Python312\python.exe") {
    "C:\Users\JONBEATZ\AppData\Local\Programs\Python\Python312\python.exe"
} else { "python" }
$scriptPath = Join-Path $PSScriptRoot 'mem0_integration.py'
$preflightPath = Join-Path $PSScriptRoot 'mem0-preflight.ps1'

if (-not $SkipPreflight -and (Test-Path $preflightPath)) {
    $needsPreflight = ($Action -eq 'search') -or ($Action -eq 'add' -and $Infer)
    if ($needsPreflight) {
        & powershell -ExecutionPolicy Bypass -File $preflightPath -Quiet
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "[Mem0] Preflight failed. LM Studio may be offline or no model loaded."
            return
        }
    }
}

if ($Action -eq "add") {
    if (-not $Text) { Write-Error "The -Text parameter is required when adding memories."; return }
    $argsList = @("--action", "add", "--text", $Text)
    if ($Infer) { $argsList += "--infer" }
} elseif ($Action -eq "search") {
    if (-not $Query) { Write-Error "The -Query parameter is required when searching memories."; return }
    $argsList = @("--action", "search", "--query", $Query)
} elseif ($Action -eq "list") {
    $argsList = @("--action", "list")
} elseif ($Action -eq "delete") {
    if (-not $Id) { Write-Error "The -Id parameter is required when deleting memories."; return }
    $argsList = @("--action", "delete", "--id", $Id)
}

$responseRaw = & $pythonPath $scriptPath $argsList 2>$null

if (-not $responseRaw) {
    Write-Warning "[Mem0] No response. Verify LM Studio is running on http://127.0.0.1:1234/v1."
    return
}

if ($responseRaw -match "Warning") {
    Write-Host $responseRaw -ForegroundColor Yellow
    return
}

try {
    $response = $responseRaw | ConvertFrom-Json
} catch {
    Write-Host "[Raw Output] $responseRaw" -ForegroundColor Red
    Write-Error "Failed to parse JSON response from Mem0 integration."
    return
}

if ($response -and $response.success) {
    if ($Action -eq "add") {
        $added = $response.data.results
        if (-not $added -or $added.Count -eq 0) {
            Write-Host "[Mem0] Add failed - no results stored. Use add (infer=False) or shorten the text." -ForegroundColor Red
            return
        }
        Write-Host "[Mem0] Memory recorded to jonbeatz_dev." -ForegroundColor Green
    } else {
        $memories = $response.data.results
        if ($memories -and $memories.Count -gt 0) {
            Write-Host "------------ JONBEATZ.DEV RECALL ------------" -ForegroundColor Cyan
            foreach ($m in $memories) { Write-Host " - $($m.memory)" -ForegroundColor White }
            Write-Host "---------------------------------------------" -ForegroundColor Cyan
        } else {
            Write-Host "[Mem0] No memories matched your request." -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "[Mem0 Error] $($response.error)" -ForegroundColor Red
}
