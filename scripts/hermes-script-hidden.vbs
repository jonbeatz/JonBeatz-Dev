' Hidden launcher for Hermes profile scripts — no console window.
' Called by JonBeatz_* scheduled tasks with one argument: the .py filename.
' Do not launch via cmd.exe / python.exe — those flash a console on Windows.
Option Explicit

Dim sh, fso, scriptDir, pyw, py, cmd
If WScript.Arguments.Count < 1 Then
  WScript.Quit 1
End If

Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
py = scriptDir & "\" & WScript.Arguments.Item(0)
pyw = FindPythonW()

If Not fso.FileExists(py) Then
  WScript.Quit 2
End If
If pyw = "" Then
  WScript.Quit 3
End If

cmd = """" & pyw & """ """ & py & """"
' Window style 0 = hidden; True = wait so the task does not overlap.
sh.Run cmd, 0, True
WScript.Quit 0

Function FindPythonW()
  Dim fso2, sh2, candidates, i
  Set fso2 = CreateObject("Scripting.FileSystemObject")
  Set sh2 = CreateObject("WScript.Shell")
  candidates = Array( _
    sh2.ExpandEnvironmentStrings("%LOCALAPPDATA%") & "\hermes\hermes-agent\venv\Scripts\pythonw.exe", _
    sh2.ExpandEnvironmentStrings("%LOCALAPPDATA%") & "\Programs\Python\Python312\pythonw.exe", _
    sh2.ExpandEnvironmentStrings("%APPDATA%") & "\uv\python\cpython-3.11-windows-x86_64-none\pythonw.exe", _
    sh2.ExpandEnvironmentStrings("%LOCALAPPDATA%") & "\Programs\Python\Python311\pythonw.exe" _
  )
  For i = 0 To UBound(candidates)
    If fso2.FileExists(candidates(i)) Then
      FindPythonW = candidates(i)
      Exit Function
    End If
  Next
  FindPythonW = ""
End Function
