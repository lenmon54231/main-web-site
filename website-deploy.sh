sudo -u www bash
cd /www/wwwroot/main-web-site
# 带时间戳的 git pull 进度
echo "[$(date +"%F %T")] 正在 git pull ..."
git pull origin main 2>&1 | while IFS= read -r line; do
  printf "[%s] %s\n" "$(date +"%F %T")" "$line"
done
echo "[$(date +"%F %T")] git pull done"
npm ci > /dev/null 2>&1
echo "[$(date +"%F %T")] npm install done"
npm run build > /dev/null 2>&1
echo "[$(date +"%F %T")] npm run build done"
rm -rf /www/wwwroot/www.3dweb.top/*
cp -r dist/* /www/wwwroot/www.3dweb.top/
echo "[$(date +"%F %T")] done"