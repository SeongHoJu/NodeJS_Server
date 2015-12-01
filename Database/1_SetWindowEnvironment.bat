@echo off

set CURRENT_DIR=%~dp0
set MONGO_PATH=%CURRENT_DIR%
set SYS_PATH=%path%


reg ADD "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v MONGO_HOME /d %CURRENT_DIR% 
reg ADD "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path /d "%SYS_PATH%;%%MONGO_HOME%%bin;" /f

pause