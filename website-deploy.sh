#!/bin/bash
cd /www/wwwroot/main-web-site || exit
echo "[$(date +"%F %T")] 进入目录：$(pwd)"

whoami
echo "[$(date +"%F %T")] 当前用户：$(whoami)"

# 给 www 用户一次性加白（不存在才加）
sudo -u www bash -c '
git config --global --get safe.directory /www/wwwroot/main-web-site &>/dev/null ||
git config --global --add safe.directory /www/wwwroot/main-web-site
'
echo "[$(date +"%F %T")] Git 安全目录配置 done"

# 拉最新代码
sudo -u www git fetch --depth=1
echo "[$(date +"%F %T")] git fetch done"

sudo -u www git reset --hard origin/main
echo "[$(date +"%F %T")] git reset done"

# 装依赖 + 构建（无日志输出）
sudo -u www npm ci --omit=dev > /dev/null 2>&1
echo "[$(date +"%F %T")] npm ci done"

sudo -u www npm run build > /dev/null 2>&1
echo "[$(date +"%F %T")] npm run build done"

# 发布
sudo -u www rm -rf /www/wwwroot/www.3dweb.top/*
echo "[$(date +"%F %T")] 清空目标目录 done"

sudo -u www cp -r dist/* /www/wwwroot/www.3dweb.top/
echo "[$(date +"%F %T")] 拷贝文件 done"

echo "[$(date +"%F %T")] 全部流程完成"