# clean-old-backups.ps1 - Retain the 10 most recent JonBeatz.dev backup folders.
param(
    [switch]$Force,
    [switch]$DryRun
)

$ErrorActionPreference = 'Continue'
$Tag = '[JBdev Backup Clean]'
$Root = Split-Path $PSScriptRoot -Parent
$loadEnv = Join-Path $PSScriptRoot 'load-env.ps1'
if (Test-Path $loadEnv) { & $loadEnv -Root $Root | Out-Null }

$BackupRoot = if ($env:JBD_BACKUP_ROOT) { $env:JBD_BACKUP_ROOT } else { 'G:\Hermes_Project_BackUpz\JonBeatz.dev' }

# Safety: never operate on the personal JonBeatz profile backup tree
# (matches ...\JonBeatz but NOT ...\JonBeatz.dev).
if ($BackupRoot -match '[\\/]JonBeatz([\\/]|$)') {
    Write-Host "$Tag Refusing to clean the personal JonBeatz path: $BackupRoot" -ForegroundColor Red
    exit 1
}

Write-Host "$Tag Retention manager (keep 10 newest)" -ForegroundColor Cyan

if (-not (Test-Path $BackupRoot)) {
    Write-Host "$Tag Backup directory does not exist: $BackupRoot" -ForegroundColor Gray
    exit 0
}

$allBackups = Get-ChildItem -Path $BackupRoot -Directory |
    Where-Object { $_.Name -match '^jonbeatz-dev-project-v\d+-[a-z]$' } |
    Sort-Object LastWriteTime -Descending

Write-Host "$Tag Scanned $BackupRoot - $($allBackups.Count) versioned folder(s)." -ForegroundColor Gray

if ($allBackups.Count -le 10) {
    Write-Host "$Tag Retention rule met (<= 10). No cleanup required." -ForegroundColor Green
    exit 0
}

$backupsToKeep = $allBackups | Select-Object -First 10
$backupsToDelete = $allBackups | Select-Object -Skip 10

Write-Host ''
Write-Host 'Backups to KEEP:' -ForegroundColor Green
foreach ($b in $backupsToKeep) { Write-Host "   [KEEP] $($b.Name)" -ForegroundColor Gray }

Write-Host ''
Write-Host 'Backups to DELETE:' -ForegroundColor Yellow
foreach ($b in $backupsToDelete) { Write-Host "   [DELETE] $($b.Name)" -ForegroundColor DarkYellow }

if ($DryRun) {
    Write-Host ''
    Write-Host "$Tag [DRY RUN] Would delete $($backupsToDelete.Count) folder(s)." -ForegroundColor Cyan
    exit 0
}

$confirmed = $Force
if (-not $confirmed) {
    $reply = Read-Host "Confirm deletion of $($backupsToDelete.Count) old backup(s)? (y/N)"
    if ($reply -eq 'y' -or $reply -eq 'Y') { $confirmed = $true }
}

if (-not $confirmed) {
    Write-Host "$Tag Cleanup cancelled." -ForegroundColor Red
    exit 0
}

foreach ($b in $backupsToDelete) {
    try {
        Remove-Item -Path $b.FullName -Recurse -Force -ErrorAction Stop
        Write-Host "   Removed $($b.Name)" -ForegroundColor Gray
    } catch {
        Write-Host "   Error removing $($b.Name): $_" -ForegroundColor Red
    }
}

Write-Host "$Tag Cleanup complete." -ForegroundColor Green
exit 0
