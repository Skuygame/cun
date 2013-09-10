@ECHO off
TITLE 导入数据
COLOR 97
CLS
%4 %5
CLS
ECHO 正在导入数据…
%1 %2 <%3
IF ERRORLEVEL 1 goto 1
IF ERRORLEVEL 0 goto 0
:0
CLS
COLOR 27
ECHO 数据导入成功，正在启动 foobar2000…
goto start
:1
CLS
COLOR 47
ECHO 数据导入失败，正在启动 foobar2000…
goto start
:start
TIMEOUT /T 5
start %4
