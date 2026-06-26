# docs-update.ps1 - JonBeatz.dev docs alignment auditor
param(
    [switch]$Quiet
)

$ErrorActionPreference = 'Continue'
$Tag = '[JBdev Docs]'
$RepoRoot = Split-Path $PSScriptRoot -Parent

function Write-Step {
    param([string]$Message, [string]$Color = 'Gray')
    if (-not $Quiet) { Write-Host "$Tag $Message" -ForegroundColor $Color }
}

Write-Step 'Docs alignment audit...' 'Cyan'

$issues = @()

$encodingCheck = Join-Path $PSScriptRoot 'encoding-check.py'
if (Test-Path $encodingCheck) {
    $py = if (Get-Command python -ErrorAction SilentlyContinue) { 'python' } else { 'py' }
    & $py $encodingCheck
    if ($LASTEXITCODE -ne 0) { $issues += 'UTF-8 mojibake in markdown (run npm run encoding:check)' }
}

$truthPath = Join-Path $RepoRoot 'TRUTH.md'
$startPath = Join-Path $RepoRoot '.cursor\docs\START-HERE.md'
$recallPath = Join-Path $RepoRoot '.cursor\docs\ReCall.md'
$pkgPath = Join-Path $RepoRoot 'package.json'

$required = @($truthPath, $startPath, $recallPath, $pkgPath)
$missing = @($required | Where-Object { -not (Test-Path $_) })
if ($missing.Count -gt 0) {
    foreach ($m in $missing) { Write-Step "MISSING: $(Split-Path $m -Leaf)" 'Yellow' }
    exit 1
}

$truth = Get-Content $truthPath -Raw -Encoding UTF8
$start = Get-Content $startPath -Raw -Encoding UTF8
$pkg = Get-Content $pkgPath -Raw -Encoding UTF8 | ConvertFrom-Json

if ($truth -notmatch 'JonBeatz\.dev') { $issues += 'TRUTH.md project root' }
if ($start -notmatch 'JonBeatz\.dev') { $issues += 'START-HERE.md project root' }
if ($truth -notmatch [regex]::Escape($pkg.version)) { $issues += "version sync (package.json $($pkg.version))" }
if ($start -notmatch 'TRUTH\.md') { $issues += 'START-HERE source-of-truth link' }

foreach ($f in @('TRUTH.md', 'START-HERE.md', 'ReCall.md', 'package.json')) {
    Write-Step "OK - $f" 'Green'
}

if ($issues.Count -gt 0) {
    Write-Step ("Alignment drift: " + ($issues -join ', ')) 'Yellow'
    exit 2
}

Write-Step 'Docs alignment complete.' 'Green'
exit 0
