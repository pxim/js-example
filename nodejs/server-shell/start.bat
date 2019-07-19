REM set NodePackagesPath=C:\Users\Administrator\Desktop\node-server
set NodePackagesPath=..\node-server

set Path=%NodePackagesPath%\node_modules.bin;%PATH%
set Path=%NodePackagesPath%;%PATH%

set NODE_PATH=%NodePackagesPath%\node_modules;%NODE_PATH%
set NODE_ENV=production

echo Environment variables are successfully added.
echo.
echo.
echo.

node server.js