# Mem0 LM Studio preflight — delegates to JonBeatz (VRAM-safe 16384/parallel 1 + smart-load).
param([switch]$Quiet)

$jonPreflight = 'D:\Hermes\projects\JonBeatz\scripts\mem0-preflight.ps1'
if (Test-Path $jonPreflight) {
    $args = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', $jonPreflight)
    if ($Quiet) { $args += '-Quiet' }
    & powershell @args
    exit $LASTEXITCODE
}

Write-Host '[JBdev:Mem0] JonBeatz mem0-preflight not found — open LM Studio on :1234.' -ForegroundColor Red
exit 1
