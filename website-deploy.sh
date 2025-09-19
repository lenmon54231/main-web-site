#!/bin/bash
cd /www/wwwroot/main-web-site
whoami
sudo -u www bash
git fetch --depth=1
git reset --hard origin/main
rm -rf node_modules package-lock.json
npm install --production
npm run build
rm -rf /www/wwwroot/www.3dweb.top/*
cp -r /www/wwwroot/main-web-site/dist/* /www/wwwroot/www.3dweb.top/

echo "-----------------------done-----------------------"