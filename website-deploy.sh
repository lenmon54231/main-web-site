sudo -u www bash
cd /www/wwwroot/main-web-site
git fetch --depth=1
echo "[$(date +"%F %T")] git pull done"
git reset --hard origin/main
rm -rf node_modules package-lock.json
npm install
echo "[$(date +"%F %T")] npm install done"
npm run build
echo "[$(date +"%F %T")] npm run build done"
rm -rf /www/wwwroot/www.3dweb.top/*
cp -r dist/* /www/wwwroot/www.3dweb.top/
echo "[$(date +"%F %T")] done"