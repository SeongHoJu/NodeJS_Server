@echo off
set RELATIVE_SCRIPT_PATH=\NodeJS_Webserver\app.js

:GET_THIS_DIR
pushd %~dp0
set THIS_DIR=%CD%
popd

SET FULL_PATH=%THIS_DIR%%RELATIVE_SCRIPT_PATH%
node.exe %FULL_PATH%
