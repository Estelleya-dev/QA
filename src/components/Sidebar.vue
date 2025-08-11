<template>
  <div class="sidebar" :class="{ collapsed }">
    <button class="sidebar-toggle" @click="$emit('toggle')"></button>
    <aside
        :class="['sidebar', props.collapsed ? 'collapsed' : '']"
    >

    <div v-if="!collapsed" class="sidebar-section">
      <div class="sidebar-title">🧭 高维智慧导航</div>
      <div class="usage-info">今日剩余次数 <strong>10/10</strong></div>
    </div>

      <nav class="space-y-2">
      <button class="quick-btn" @click="$emit('changeCategory', '财富显化')">💰 财富显化</button>
      <button class="quick-btn" @click="$emit('changeCategory', '情感关系')">❤️ 情感关系</button>
      <button class="quick-btn" @click="$emit('changeCategory', '身心健康')">🍃 身心健康</button>
      <button class="quick-btn" @click="$emit('changeCategory', '清理卡点')">🚪 清理卡点</button>
      <button class="quick-btn" @click="$emit('changeCategory', '自由发问')">🌀 自由发问</button>
      </nav>
      <!-- ====== 历史会话 ====== -->
      <section class="mt-5">
        <div class="qa-section-title">
          <span>🕘</span><span>历史会话</span>
        </div>
        <!-- 使用拆分好的组件，支持点击恢复/重命名/删除 -->
        <HistoryList />
      </section>

      <!-- ====== 底部操作 ====== -->
      <section class="mt-5 space-y-3">
        <button class="qa-btn qa-btn--primary" @click="handleStartNew">
          ✨ 开始新对话
        </button>

        <button class="qa-btn qa-btn--ghost" @click="goToSettings">
          ⚙️ 用户设置
        </button>
      </section>
      </aside>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '../stores/chatStore'
import HistoryList from '../components/HistoryList.vue' // 若未拆分，可把历史列表写回本文件

const router = useRouter()
const chatStore = useChatStore()
const props = defineProps({ collapsed: { type: Boolean, default: false } })
const emit = defineEmits(['toggle'])

// 首次挂载时，拉取历史会话（有后端则会请求；无后端也不报错）
onMounted(() => {
  chatStore.loadHistoryFromServer?.()
})

// 开始新对话：保存当前 → 新建 session → 清空消息
const handleStartNew = async () => {
  await chatStore.startNewSession?.()
}

// 跳往用户设置页（路由请保持为 /settings）
const goToSettings = () => {
  router.push('/settings')
}
</script>

<style scoped>
.quick-btn {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  gap: 10px;               /* 间距感 */
  margin-top: 10px;
}

.sidebar-section session-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  padding: 0;
  list-style: none;
}

.knowledge-item{
  margin-top: 15px; /* 设置按钮和上方列表拉开间距 */
}

</style>