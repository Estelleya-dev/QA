<template>
  <div class="settings-container">
    <h2 class="title">用户信息设置</h2>

    <div class="form-group">
      <label>昵称</label>
      <input v-model="profile.name" type="text" placeholder="请输入昵称" />
    </div>

    <div class="form-group">
      <label>关注领域</label>
      <div class="checkbox-list">
        <label v-for="domain in allDomains" :key="domain">
          <input
              type="checkbox"
              :value="domain"
              v-model="profile.domains"
          />
          {{ domain }}
        </label>
      </div>
    </div>

    <div class="form-group">
      <label>头像（暂不支持上传）</label>
      <input v-model="profile.avatar" type="text" placeholder="请输入头像URL" />
    </div>

    <div class="button-group">
      <button @click="saveProfile">保存设置</button>
      <button class="secondary" @click="resetProfile">重置</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const profile = ref({
  name: '',
  avatar: '',
  domains: []
})

const allDomains = ['财富显化', '健康养生', '感情关系', '个人成长', '修行觉悟']

onMounted(() => {
  const saved = localStorage.getItem('user_profile')
  if (saved) {
    profile.value = JSON.parse(saved)
  }
})

const saveProfile = () => {
  localStorage.setItem('user_profile', JSON.stringify(profile.value))
  alert('设置已保存')
  router.push('/dashboard')
}

const resetProfile = () => {
  profile.value = { name: '', avatar: '', domains: [] }
}
</script>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 40px auto;
  background: #111;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.2);
  color: #fff;
  font-family: 'Noto Serif SC', serif;
}

.title {
  font-size: 24px;
  margin-bottom: 24px;
  color: #ffcc70;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #ffda77;
}

input[type='text'] {
  width: 100%;
  padding: 8px;
  border: 1px solid #444;
  border-radius: 6px;
  background: #1f1f1f;
  color: #fff;
}

.checkbox-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.checkbox-list label {
  font-size: 14px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
}

button {
  padding: 10px 20px;
  border: none;
  background: #ffd700;
  color: #000;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

button.secondary {
  background: #555;
  color: #fff;
}
</style>
