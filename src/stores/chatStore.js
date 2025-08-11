// src/stores/chatStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const currentSessionId = ref(uuidv4())

export const useChatStore = defineStore('chat', () => {
    const messages = ref([])
    const history = ref([]) // [{ sessionId, title?, timestamp, preview, messages }]

    // 初始化：拉历史（兼容返回 sessions 或 messages）
    async function loadHistoryFromServer() {
        try {
            const res = await axios.get('http://localhost:3000/chat/history')
            if (res.data?.sessions) {
                history.value = res.data.sessions
            } else if (res.data?.messages) {
                messages.value = res.data.messages.map(msg => ({
                    role: msg.role,
                    text: msg.text,
                    timestamp: msg.timestamp,
                }))
            }
        } catch (err) {
            console.error('加载聊天历史失败:', err)
        }
    }

    // 根据 sessionId 从后端拉取消息
    async function loadMessages(sessionId) {
        try {
            const res = await axios.get('http://localhost:3000/chat/history', {
                params: { session: sessionId },
            })
            messages.value = res.data.messages
        } catch (err) {
            console.error('加载历史记录失败', err)
        }
    }

    // 发送消息
    async function sendMessage(text) {
        if (!text.trim()) return

        const userMsg = {
            role: 'user',
            text: text.trim(),
            timestamp: new Date().toISOString(),
        }
        messages.value.push(userMsg)

        try {
            const res = await axios.post('http://localhost:3000/chat/ask', {
                text: userMsg.text,
                session_id: currentSessionId.value,
            })
            const aiMsg = {
                role: 'assistant',
                text: res.data?.answer || '🤖 AI 暂无回复',
                timestamp: new Date().toISOString(),
            }
            messages.value.push(aiMsg)
        } catch (err) {
            console.error('[AI 回复失败]', err?.message)
            messages.value.push({
                role: 'assistant',
                text: '❌ AI 回复失败，请稍后重试。',
                timestamp: new Date().toISOString(),
            })
        }
    }

    // —— 新增：把当前会话保存为历史项
    async function saveCurrentToHistory() {
        if (!messages.value.length) return
        const firstUser = messages.value.find(m => m.role === 'user')
        const item = {
            sessionId: currentSessionId.value,
            timestamp: new Date().toISOString(),
            title: firstUser?.text?.slice(0, 18) || '未命名对话',
            preview: messages.value[0]?.text?.slice(0, 30) || '新会话',
            messages: [...messages.value],
        }
        history.value.unshift(item)
        try {
            await axios.post('http://localhost:3000/chat/save', item)
        } catch (e) {
            console.warn('保存到后端失败（已本地保存）:', e?.message)
        }
    }

    // —— 新增：开始新对话
    async function startNewSession() {
        await saveCurrentToHistory()
        currentSessionId.value = uuidv4()
        messages.value = []
    }

    // —— 新增：恢复到某个历史会话（优先后端拉取）
    async function restoreSession(sessionId) {
        currentSessionId.value = sessionId
        try {
            await loadMessages(sessionId)
        } catch (_) {
            const found = history.value.find(h => h.sessionId === sessionId)
            if (found?.messages) messages.value = [...found.messages]
        }
    }

    // —— 新增：重命名会话
    async function renameSession(sessionId, newTitle) {
        const item = history.value.find(h => h.sessionId === sessionId)
        if (!item) return
        item.title = newTitle?.trim() || item.title
        try {
            await axios.post('http://localhost:3000/chat/rename', {
                sessionId,
                title: item.title,
            })
        } catch (e) {
            console.warn('重命名未持久化（本地已改）:', e?.message)
        }
    }

    // —— 新增：删除会话
    async function deleteSession(sessionId) {
        const idx = history.value.findIndex(h => h.sessionId === sessionId)
        if (idx === -1) return
        const [removed] = history.value.splice(idx, 1)
        try {
            await axios.post('http://localhost:3000/chat/delete', {
                sessionId,
            })
        } catch (e) {
            console.warn('删除未持久化（本地已删）:', e?.message)
            // 可按需回滚：history.value.splice(idx, 0, removed)
        }
        // 如果删的是当前会话，可视情况新建一轮
        if (removed?.sessionId === currentSessionId.value) {
            currentSessionId.value = uuidv4()
            messages.value = []
        }
    }

    function clearMessages() {
        messages.value = []
    }

    return {
        // state
        messages,
        history,
        currentSessionId,

        // actions
        sendMessage,
        clearMessages,
        loadHistoryFromServer,
        loadMessages,

        // 新增导出
        saveCurrentToHistory,
        startNewSession,
        restoreSession,
        renameSession,
        deleteSession,
    }
})
