# JonBeatz.dev session stop - lightweight closeout reminder.
param(
    [switch]$Quiet
)

$Tag = '[JBdev Session]'
Write-Host ''
Write-Host "$Tag Session closeout." -ForegroundColor Cyan

# Free RAM: stop the OmniVoice daemon if it was warmed during this session.
$omni = Join-Path $PSScriptRoot 'jarvis-omni-daemon.ps1'
if (Test-Path $omni) {
    & powershell -NoProfile -ExecutionPolicy Bypass -File $omni -Stop -Quiet | Out-Null
    Write-Host "$Tag OmniVoice daemon stopped (if it was running)." -ForegroundColor DarkGray
}

Write-Host "$Tag Before you go:" -ForegroundColor Gray
Write-Host "  - Update .cursor/docs/ReCall.md + project-log.md" -ForegroundColor DarkGray
Write-Host "  - npm run docs:sync" -ForegroundColor DarkGray
Write-Host "  - git commit + push, then npm run backup:quick" -ForegroundColor DarkGray
Write-Host "$Tag Done." -ForegroundColor Green
Write-Host ''
exit 0
