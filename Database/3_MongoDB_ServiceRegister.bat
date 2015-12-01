set DATA_PATH=C:\Users\SeongHo\Documents\GitHub\NodeJS_Server\Database
echo %DATA_PATH%

@echo off

mongod.exe -f %DATA_PATH%\mongod.cfg -install  -rest

pause