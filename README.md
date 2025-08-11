# Quantum AI 前端项目

## 项目简介
基于Vue.js开发的高维智慧AI问答系统前端，严格保持原有界面设计，集成用户认证、个人知识库、每日限制等功能。

## 技术栈
- Vue.js 3.3.4
- Vite 4.4.0
- Element Plus 2.3.8
- Pinia 2.1.4
- Vue Router 4.2.4
- Sass 1.63.6

## 安装运行

### 1. 安装依赖
```bash
npm install
```

### 2. 开发运行
```bash
npm run dev
```

### 3. 生产构建
```bash
npm run build
```

### 4. 部署到腾讯云
```bash
npm run deploy
```

## 项目结构
```
src/
├── main.js           # 应用入口
├── App.vue          # 主应用组件
├── components/      # 组件目录
├── styles/         # 样式文件
├── config/         # 配置文件
├── stores/         # 状态管理
├── api/           # API调用
└── router/        # 路由配置
```

## 部署说明

### 腾讯云服务器部署
1. 上传项目文件到服务器
2. 执行 `chmod +x deploy.sh`
3. 运行 `./deploy.sh`
4. 将dist目录文件部署到Nginx

### 环境变量配置
在生产环境中需要修改以下配置：
- API_CONFIG.BASE_URL: 后端API地址
- DEEPSEEK_KEY: DeepSeek API密钥
- WECHAT_APPID: 微信小程序AppID

## 功能特性
- ✅ 1:1还原原界面设计
- ✅ 用户认证和授权码验证
- ✅ 每日10次问答限制
- ✅ 个人知识库系统
- ✅ 可折叠侧边栏
- ✅ 响应式设计
- ✅ 深度AI问答分析

## 联系支持
如有问题请联系项目维护者。
