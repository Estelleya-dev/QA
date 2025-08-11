<template>
  <div class="chat-wrapper">
    <!-- 聊天记录 -->
    <div class="chat-history" ref="chatContainer">
      <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.role === 'user' ? 'user-message' : 'ai-message']"
      >
        <span v-if="msg.role === 'assistant'">🤖：</span>
        <span v-else>👤：</span>
        {{ msg.text }}
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="chat-input-area">
      <input
          class="input-field"
          type="text"
          placeholder="请输入您的问题..."
          v-model="inputText"
          @keyup.enter="handleSend"
      />
      <button class="send-button" @click="handleSend" :disabled="!inputText.trim()">
        发送
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useChatStore } from '../stores/chatStore'

const chatStore = useChatStore()
const messages = chatStore.messages
const inputText = ref('')
const chatContainer = ref(null)

const handleSend = () => {
  if (!inputText.value.trim()) return
  chatStore.sendMessage(inputText.value)
  inputText.value = ''
}

// 自动滚动到底部
watch(messages, async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
})
</script>

<style scoped>
.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
  background: rgba(0, 0, 0, 0.4);
  padding: 16px;
  border-radius: 12px;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #333;
  border-radius: 8px;
  background: #111;
}

.message {
  margin-bottom: 10px;
  padding: 10px 15px;
  border-radius: 10px;
  color: #fff;
}

.user-message {
  background-color: #4b0082;
  align-self: flex-end;
}

.ai-message {
  background-color: #333;
  align-self: flex-start;
}

.chat-input-area {
  display: flex;
  gap: 10px;
}

.input-field {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  outline: none;
  background: #222;
  color: white;
}

.send-button {
  background: purple;
  color: white;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
