@echo off

set CURRENT_DIR=%~dp0
set MONGO_PATH=%CURRENT_DIR%

reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v MONGO_HOME /d %CURRENT_DIR%
reg ADD "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path /d "%path%%MONGO_PATH%bin;" /f

pause