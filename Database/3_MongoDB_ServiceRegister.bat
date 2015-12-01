@echo off

set CURRENT_DIR=%~dp0
set DATA_PATH=%CURRENT_DIR%

mongod.exe -f %DATA_PATH%\mongod.cfg -install -rest

pause