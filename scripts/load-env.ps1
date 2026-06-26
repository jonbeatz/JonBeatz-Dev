# load-env.ps1 - Load JonBeatz.dev .env.local into the current PowerShell session
param(
    [string]$Root = (Split-Path $PSScriptRoot -Parent)
)

$envFile = Join-Path $Root '.env.local'
if (-not (Test-Path $envFile)) {
    return $false
}

Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith('#')) { return }
    if ($line -match '^([^=]+)=(.*)$') {
        $key = $Matches[1].Trim()
        $val = $Matches[2].Trim()
        if (($val.StartsWith('"') -and $val.EndsWith('"')) -or ($val.StartsWith("'") -and $val.EndsWith("'"))) {
            $val = $val.Substring(1, $val.Length - 2)
        }
        $val = [Environment]::ExpandEnvironmentVariables($val)
        Set-Item -Path "Env:$key" -Value $val
    }
}

return $true
