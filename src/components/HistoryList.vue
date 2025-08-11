
<script setup>
import { ref, computed } from 'vue'
import { useChatStore } from '../stores/chatStore'

const chatStore = useChatStore()

const editingId = ref(null)
const editingTitle = ref('')

const list = computed(() => chatStore.history || [])
const activeId = computed(() => chatStore.currentSessionId)

function startEdit(item) {
  editingId.value = item.sessionId
  editingTitle.value = item.title || item.preview || '未命名对话'
}

async function saveEdit(item) {
  const title = editingTitle.value.trim()
  if (title && title !== item.title) {
    await chatStore.renameSession?.(item.sessionId, title)
  }
  editingId.value = null
  editingTitle.value = ''
}

function cancelEdit() {
  editingId.value = null
  editingTitle.value = ''
}

async function handleRestore(item) {
  await chatStore.restoreSession?.(item.sessionId)
}

async function handleDelete(item) {
  const ok = confirm('确定删除该会话吗？此操作不可恢复。')
  if (ok) {
    await chatStore.deleteSession?.(item.sessionId)
  }
}
</script>

<template>
  <div class="space-y-2 max-h-[40vh] overflow-auto pr-1">
    <button
        v-for="item in list"
        :key="item.sessionId"
        class="qa-list-item"
        :class="{ 'is-active': item.sessionId === activeId }"
        @click="handleRestore(item)"
        type="button"
    >
      <!-- 编辑态 -->
      <div v-if="editingId === item.sessionId" class="flex items-center gap-2">
        <input
            v-model="editingTitle"
            class="flex-1 bg-transparent outline-none border-b border-white/30 text-sm text-white/90"
            @click.stop
            @keyup.enter.stop="saveEdit(item)"
            @keyup.esc.stop="cancelEdit"
            autofocus
        />
        <button
            class="qa-btn qa-btn--ghost"
            style="width:auto;border-radius:10px;padding:6px 10px"
            @click.stop="saveEdit(item)"
            type="button"
        >
          保存
        </button>
        <button
            class="qa-btn qa-btn--ghost"
            style="width:auto;border-radius:10px;padding:6px 10px"
            @click.stop="cancelEdit"
            type="button"
        >
          取消
        </button>
      </div>

      <!-- 常规态 -->
      <div v-else class="flex items-center gap-2">
        <div class="flex-1">
          <div class="qa-list-item__title">
            {{ item.title || item.preview || '未命名对话' }}
          </div>
          <div class="qa-list-item__time">
            {{ new Date(item.timestamp).toLocaleString() }}
          </div>
        </div>

        <div class="flex gap-1" style="opacity:.9;" @click.stop>
          <button
              class="qa-btn qa-btn--ghost"
              style="width:auto;border-radius:10px;padding:6px 10px"
              @click="startEdit(item)"
              type="button"
          >
            重命名
          </button>
          <button
              class="qa-btn qa-btn--ghost"
              style="width:auto;border-radius:10px;padding:6px 10px"
              @click="handleDelete(item)"
              type="button"
          >
            删除
          </button>
        </div>
      </div>
    </button>

    <div v-if="!list.length" class="text-xs text-white/50">
      暂无历史会话
    </div>
  </div>
</template>

<style scoped>
/* 这里一般不需要额外样式，外观已由 main.css 中的 .qa-* 类控制 */
</style>
