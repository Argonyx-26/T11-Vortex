@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
echo Starting VORTEX Face Enrollment & Fusion Score Backend...
node backend\server.js
pause
