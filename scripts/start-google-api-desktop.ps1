# Delegates to portable Hermes deepseek-api home (D:\Hermes\projects\_core-scripts\deepseek-api)
$HermesStart = 'D:\Hermes\projects\_core-scripts\deepseek-api\scripts\start-deepseek.ps1'
if (-not (Test-Path $HermesStart)) {
    throw "deepseek-api not found. Run: D:\Hermes\projects\_core-scripts\deepseek-api\scripts\Start-My-DeepSeek-API.ps1"
}
& powershell -NoProfile -ExecutionPolicy Bypass -File $HermesStart @args