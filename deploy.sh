#!/bin/bash

echo "开始部署 Quantum AI 前端项目..."

# 检查Node.js版本
node_version=$(node -v)
echo "当前Node.js版本: $node_version"

# 安装依赖
echo "正在安装依赖..."
npm install

# 构建项目
echo "正在构建项目..."
npm run build

# 检查构建结果
if [ -d "dist" ]; then
    echo "构建成功！"
    echo "构建文件位于 dist/ 目录"

    # 如果有腾讯云COS配置，可以自动上传
    # 需要先安装 coscmd: pip install coscmd
    # coscmd config -a your-secret-id -s your-secret-key -b your-bucket -r ap-guangzhou
    # coscmd upload -r dist/ /

    echo "前端部署完成！"
    echo "请将 dist/ 目录下的文件上传到腾讯云服务器或COS"
else
    echo "构建失败！请检查错误信息"
    exit 1
fi