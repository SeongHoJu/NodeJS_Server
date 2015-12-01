@echo off

set DB_DIRECTORY=data
set CURRENT_DIR=%~dp0
set DB_PATH=%CURRENT_DIR%\%DB_DIRECTORY%

@echo off

if not exist %DB_PATH% MD %DB_PATH%
mongod.exe --dbpath %DB_PATH%

pause
