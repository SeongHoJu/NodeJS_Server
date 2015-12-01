; Mongo DB Register Window Environment Path

set DB_PATH=C:\Users\SeongHo\Documents\GitHub\NodeJS_Server\Database

reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v MONGO_HOME /d %DB_PATH%
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path /d %Path%;%%MONGO_HOME%%\bin\