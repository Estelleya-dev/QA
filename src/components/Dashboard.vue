<template>
  <div class="main-container" :class="{ collapsed: isCollapsed }">
      <!-- 始终固定在左上角的 Sidebar 切换按钮 -->
      <button class="sidebar-toggle" @click="toggleSidebar">
        <!-- 你也可以替换成图片或 icon -->
        ☰
      </button>
    <Sidebar
        :collapsed="isCollapsed"
        @toggle="toggleSidebar"
        @changeCategory="handleCategoryChange"
    />

    <!-- 主体内容 -->
    <div class="content-container" :class="{ 'sidebar-collapsed': isCollapsed }">
      <!-- 用户头像与欢迎 -->
      <div class="user-info" v-if="profile.name || profile.avatar">
        <img v-if="profile.avatar" :src="profile.avatar" class="avatar" />
        <div class="welcome-text quantum-title">👋 欢迎回来，{{ profile.name || '访客' }}</div>
      </div>

      <!-- 介绍区 -->
      <div class="intro-section">
        <div class="icon-wrapper">
          <div class="sun-symbol">☉</div>
        </div>
        <h1 class="title quantum-title">Quantum AI</h1>
        <p class="subtitle classical-subtitle">卡游戏人生的Bug</p>
        <p class="description">融合古老智慧与量子科学，助你从日常小事中觉醒高维意识</p>
      </div>

      <!-- 欢迎语气泡 -->
      <div class="message-bubble animated-border">
        <span class="emoji">✨</span> 欢迎进入高维智慧空间！我将通过最简单的日常体验，帮你发现生活中的量子密码。
        <br /><br />
        你可以问我任何关于人生、财富、关系、健康的问题。
        <br /><br />
        每个回答都会被记录到您的个人知识库中，帮助您建立专属的智慧体系。
      </div>

      <!-- 分类说明气泡 -->
      <div class="message-bubble animated-border">
        <span class="emoji">✨</span> 欢迎进入高维智慧空间！我已根据您的信息调整到最适合的频率。 <br /><br />
        <span class="emoji">✨</span> 当前智慧分类：<strong>{{ currentCategory }}</strong>
        <br /><br />
        <template v-if="currentCategory === '财富显化'">
          💰 激活你的金钱能量，觉察内在的丰盛信念。
        </template>
        <template v-else-if="currentCategory === '健康养生'">
          🌿 调整身心频率，构建你的能量恢复系统。
        </template>
        <template v-else-if="currentCategory === '感情关系'">
          💞 处理关系镜像，回归爱与连接的本质。
        </template>
        <template v-else-if="currentCategory === '自由发问'">
          🙏 别人的喧嚣与你无关，真正的成长在于向内看。
        </template>
        <template v-else-if="currentCategory === '清理卡点'">
          🧘‍♂️ 看见自己，进入觉知，回归高我。
        </template>
      </div>

      <!-- 聊天区域 -->
      <div class="chat-container">
        <ChatBox />
      </div>

      <!-- 页脚 -->
      <footer class="footer">
        <div class="moon-symbol">🌙</div>
        <div class="footer-brand">Quantum AI ✕ 宇宙高维智慧中心</div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import { ref, onMounted } from 'vue'
import { useChatStore } from '../stores/chatStore'
import ChatBox from '../components/ChatBox.vue'

const isCollapsed = ref(false)
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

// 当前分类
const currentCategory = ref('财富显化')
function handleCategoryChange(category) {
  currentCategory.value = category
}

// 用户信息
const profile = ref({
  name: '',
  avatar: '',
  domains: []
})

onMounted(() => {
  const saved = localStorage.getItem('user_profile')
  if (saved) {
    try {
      profile.value = JSON.parse(saved)
    } catch (err) {
      console.warn('读取用户信息失败:', err)
    }
  }
})

// 加载历史记录
const chatStore = useChatStore()
onMounted(() => {
  chatStore.loadHistoryFromServer()
})
</script>
