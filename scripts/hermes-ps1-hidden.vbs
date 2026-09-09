' Hidden launcher for a PowerShell script — no console window.
' Argument: full path to the .ps1 file.
Option Explicit

Dim sh, fso, ps1, cmd, powershell
If WScript.Arguments.Count < 1 Then
  WScript.Quit 1
End If

Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
ps1 = WScript.Arguments.Item(0)
If Not fso.FileExists(ps1) Then
  WScript.Quit 2
End If

powershell = sh.ExpandEnvironmentStrings("%SystemRoot%") & "\System32\WindowsPowerShell\v1.0\powershell.exe"
cmd = """" & powershell & """ -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File """ & ps1 & """"
sh.Run cmd, 0, True
WScript.Quit 0
