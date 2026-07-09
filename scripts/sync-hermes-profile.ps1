# Sync this profile's CLI templates (cli-profile\config.yaml + SOUL.md)
# into %LOCALAPPDATA%\hermes\profiles\<slug>.
$ErrorActionPreference = 'Stop'

$ProfileRoot = Split-Path $PSScriptRoot -Parent
$manifest = Join-Path $ProfileRoot 'hermes-desktop-profile.json'
$slug = 'jonbeatz-dev'
if (Test-Path $manifest) {
    try { $slug = (Get-Content $manifest -Raw | ConvertFrom-Json).profileName } catch { }
}

$TemplateDir = Join-Path $ProfileRoot 'cli-profile'
$ProfileHome = Join-Path $env:LOCALAPPDATA "hermes\profiles\$slug"

if (-not (Test-Path $TemplateDir)) {
    Write-Host "[profile-sync] no cli-profile templates at $TemplateDir" -ForegroundColor Yellow
    return
}

New-Item -ItemType Directory -Path $ProfileHome -Force | Out-Null
foreach ($file in @('config.yaml', 'SOUL.md')) {
    $src = Join-Path $TemplateDir $file
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination (Join-Path $ProfileHome $file) -Force
        Write-Host "[profile-sync] synced $file -> $ProfileHome" -ForegroundColor Green
    }
}