sudo -u www bash
cd /www/wwwroot/main-web-site
git fetch --depth=1
echo "-----------------------git pull done-----------------------"
git reset --hard origin/main
rm -rf node_modules package-lock.json
npm install
echo "-----------------------npm install done-----------------------"
npm run build
echo "-----------------------npm run build done-----------------------"
rm -rf /www/wwwroot/www.3dweb.top/*
cp -r dist/* /www/wwwroot/www.3dweb.top/
echo "-----------------------done-----------------------"