// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'
import { createPinia } from 'pinia'

// 正确顺序：先创建 app
const app = createApp(App)

// 然后 use 插件
app.use(createPinia())
app.use(router)

// 最后挂载
app.mount('#app')
