// API配置
export const API_CONFIG = {
  // 腾讯云服务器地址（部署时需要修改）
  BASE_URL: import.meta.env.VITE_APP_API_BASE,


  // DeepSeek API配置
  DEEPSEEK_API: 'https://api.deepseek.com/chat/completions',
  DEEPSEEK_KEY: 'sk-your-deepseek-api-key', // 需要替换为实际的API Key

  // 腾讯云短信配置
  SMS_API: 'https://sms.tencentcloudapi.com',

  // 微信小程序配置
  WECHAT_APPID: 'your-wechat-appid',

  // 请求超时时间
  TIMEOUT: 30000,

  // 用户每日限制
  DAILY_LIMIT: 10
}

// 请求拦截器配置
export const REQUEST_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
}