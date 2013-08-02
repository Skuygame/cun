@echo off
taskkill /f /im cgminer.exe /t
timeout /t 600
d:
cd D:\Program\cgminer-3.0.0-windows
cgminer.exe --gpu-powertune 5 -o http://stratum1.btcguild.com:3333 -u sophiasmth_6870 -p X

pause