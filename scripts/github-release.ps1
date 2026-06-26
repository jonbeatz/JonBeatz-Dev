# github-release.ps1 — tag, push, and publish GitHub release from package.json version
param(
    [string]$Tag,
    [switch]$SkipPush,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$Prefix = '[GH-Release]'
$RepoRoot = Join-Path $PSScriptRoot '..'

if (-not $Tag) {
    $pkgPath = Join-Path $RepoRoot 'package.json'
    if (-not (Test-Path $pkgPath)) {
        Write-Error "Could not find package.json to resolve version tag."
    }
    $pkg = Get-Content $pkgPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $Tag = "v$($pkg.version)"
}

Write-Host ''
Write-Host '==========================================================' -ForegroundColor Cyan
Write-Host ' [GH] JonBeatz GitHub Release Automator' -ForegroundColor Cyan
Write-Host '==========================================================' -ForegroundColor Cyan
Write-Host "  Target Tag:  $Tag"
Write-Host '==========================================================' -ForegroundColor Cyan
Write-Host ''

$gh = Get-Command gh -ErrorAction SilentlyContinue
if (-not $gh) {
    Write-Warning "$Prefix GitHub CLI 'gh' is not installed. Install from https://cli.github.com/"
    exit 1
}

Write-Host "$Prefix Checking GitHub authentication..." -ForegroundColor Gray
$auth = & gh auth status 2>&1 | Out-String
if ($auth -notmatch 'Logged in to') {
    Write-Warning "$Prefix Not logged in. Run: gh auth login"
    exit 1
}
Write-Host '  GitHub authenticated successfully!' -ForegroundColor Green

# Sync README badges before release (UTF-8 safe Python)
$encodingCheck = Join-Path $PSScriptRoot 'encoding-check.py'
if (Test-Path $encodingCheck) {
    Write-Host "$Prefix UTF-8 mojibake scan..." -ForegroundColor Gray
    $py = if (Get-Command python -ErrorAction SilentlyContinue) { 'python' } else { 'py' }
    & $py $encodingCheck
    if ($LASTEXITCODE -ne 0) {
        Write-Error "$Prefix Markdown mojibake detected. Fix with npm run encoding:check before release."
    }
}

$syncScript = Join-Path $PSScriptRoot 'sync-version.ps1'
if (Test-Path $syncScript) {
    Write-Host "$Prefix Syncing README version badges..." -ForegroundColor Gray
    & powershell -NoProfile -ExecutionPolicy Bypass -File $syncScript -Quiet
}

Push-Location $RepoRoot
try {
    $branch = (git rev-parse --abbrev-ref HEAD).Trim()
    $headSha = (git rev-parse HEAD).Trim()

    # Ensure working tree committed (warn only)
    $dirty = git status --porcelain
    if ($dirty) {
        Write-Warning "$Prefix Working tree has uncommitted changes. Commit before release for a clean tag."
    }

    # Create local tag if missing
    $localTag = git tag -l $Tag
    if (-not $localTag) {
        Write-Host "$Prefix Creating local tag $Tag @ $headSha..." -ForegroundColor Yellow
        git tag -a $Tag -m "JonBeatz $Tag"
    } else {
        Write-Host "$Prefix Local tag $Tag already exists." -ForegroundColor DarkGray
    }

    if (-not $SkipPush) {
        Write-Host "$Prefix Pushing branch $branch..." -ForegroundColor Gray
        git push -u origin $branch
        Write-Host "$Prefix Pushing tag $Tag..." -ForegroundColor Gray
        git push origin $Tag
    }

    # Check remote release
    $releaseExists = $false
    $ErrorActionPreference = 'Continue'
    $existing = & gh release view $Tag 2>&1 | Out-String
    if ($LASTEXITCODE -eq 0 -and $existing -match 'tag:') {
        $releaseExists = $true
    }
    $ErrorActionPreference = 'Stop'

    if ($releaseExists -and -not $Force) {
        Write-Warning "Release $Tag already exists on GitHub. Use -Force to recreate."
        exit 0
    }

    if ($releaseExists -and $Force) {
        Write-Host "$Prefix Deleting existing release $Tag..." -ForegroundColor Yellow
        & gh release delete $Tag --yes
    }

    Write-Host "$Prefix Publishing GitHub release $Tag..." -ForegroundColor Yellow
    & gh release create $Tag `
        --target $headSha `
        --generate-notes `
        --latest `
        --title "JonBeatz $Tag"

    if ($LASTEXITCODE -ne 0) {
        throw "gh release create failed with exit code $LASTEXITCODE"
    }

    Write-Host "  GitHub Release $Tag published!" -ForegroundColor Green
    $viewUrl = (& gh release view $Tag --json url -q .url 2>$null)
    if ($viewUrl) { Write-Host "  URL: $viewUrl" -ForegroundColor DarkGray }
} catch {
    Write-Error "Failed to create GitHub release: $($_.Exception.Message)"
    exit 1
} finally {
    Pop-Location
}

Write-Host ''
Write-Host '==========================================================' -ForegroundColor Green
Write-Host ' GitHub Release completed successfully!' -ForegroundColor Green
Write-Host '==========================================================' -ForegroundColor Green
Write-Host ''
exit 0
