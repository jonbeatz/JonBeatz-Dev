# Launch Hermes Desktop with the jonbeatz.dev profile (one-click)
$ErrorActionPreference = 'Stop'

$ProfileRoot = Split-Path $PSScriptRoot -Parent
$ProfileName = 'jonbeatz-dev'
$HermesExe = Join-Path $env:LOCALAPPDATA 'hermes\hermes-agent\apps\desktop\release\win-unpacked\Hermes.exe'
$HermesAppData = Join-Path $env:APPDATA 'Hermes'

if (-not (Test-Path $ProfileRoot)) { Write-Error "Profile path not found: $ProfileRoot" }
if (-not (Test-Path $HermesExe)) { Write-Error "Hermes Desktop not found: $HermesExe" }

# Keep the CLI profile (config.yaml + SOUL.md) in sync before launch.
$syncScript = Join-Path $PSScriptRoot 'sync-hermes-profile.ps1'
if (Test-Path $syncScript) { & $syncScript }

New-Item -ItemType Directory -Path $HermesAppData -Force | Out-Null

function Write-JsonFileNoBom {
    param([string]$Path, [hashtable]$Object)
    $json = $Object | ConvertTo-Json -Compress
    [System.IO.File]::WriteAllText($Path, $json, (New-Object System.Text.UTF8Encoding($false)))
}

Write-JsonFileNoBom -Path (Join-Path $HermesAppData 'project-dir.json') -Object @{ dir = $ProfileRoot }
Write-JsonFileNoBom -Path (Join-Path $HermesAppData 'active-profile.json') -Object @{ profile = $ProfileName }

Write-Host "[jonbeatz.dev] project-dir   -> $ProfileRoot" -ForegroundColor Cyan
Write-Host "[jonbeatz.dev] active-profile -> $ProfileName" -ForegroundColor Cyan
Write-Host "[jonbeatz.dev] Launching Hermes Desktop..." -ForegroundColor Green

$env:HERMES_DESKTOP_CWD = $ProfileRoot
Start-Process -FilePath $HermesExe -WorkingDirectory $ProfileRoot