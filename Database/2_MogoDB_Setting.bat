set DB_DIRECTORY=data
set DB_PATH=C:\Users\SeongHo\Documents\GitHub\NodeJS_Server\Database\%DB_DIRECTORY%
echo %DB_PATH%

@echo off

if not exist %DB_PATH% MD %DB_PATH%
mongod.exe --dbpath %DB_PATH%

pause
