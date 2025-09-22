sudo -u www bash
cd /www/wwwroot/main-web-site
git pull
echo "[$(date +"%F %T")] git pull done"
git reset --hard origin/main
npm ci
echo "[$(date +"%F %T")] npm install done"
npm run build
echo "[$(date +"%F %T")] npm run build done"
rm -rf /www/wwwroot/www.3dweb.top/*
cp -r dist/* /www/wwwroot/www.3dweb.top/
echo "[$(date +"%F %T")] done"