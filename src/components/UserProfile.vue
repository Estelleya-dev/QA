<template>
  <div class="profile-wrapper">
    <div class="profile-panel">
      <div class="profile-title">高维智慧认证</div>
      <div class="profile-description">
        ⚠️ 为了为您定制最适合的高维智慧方案，请如实填写以下信息：<br><br>
        ✨ 出生日期：用于匹配您的能量频率特征<br>
        🎯 显化等级：帮助我们调整指导深度<br>
        🌈 关注领域：定制专属的智慧内容<br><br>
        您的信息将被严格加密保护，仅用于个性化服务优化。
      </div>

      <!-- 出生日 -->
      <input type="date" v-model="form.birth" class="profile-input" />

      <!-- 显化等级 -->
      <div class="section-title">选择您的显化等级：</div>
      <div class="level-options">
        <div
            v-for="item in levels"
            :key="item"
            class="level-button"
            :class="{ selected: form.level === item }"
            @click="form.level = item"
        >{{ item }}</div>
      </div>

      <!-- 关注领域 -->
      <div class="section-title">关注领域（可多选）：</div>
      <div class="field-options">
        <div
            v-for="item in domains"
            :key="item"
            class="field-button"
            :class="{ selected: form.domains.includes(item) }"
            @click="toggleDomain(item)"
        >{{ item }}</div>
      </div>

      <button class="submit-button" @click="submitInfo">进入高维智慧空间</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  birth: '',
  level: '',
  domains: []
})

const levels = [
  '0级启蒙觉醒者',
  '3级初心践行者',
  '6级深度探索者',
  '9级开悟边缘者',
  '∞级悟后起修者'
]

const domains = ['💰 财富显化', '🌿 健康养生', '💕 感情关系', '🌱 个人成长', '🧘 修行觉悟']

const toggleDomain = (item) => {
  if (form.value.domains.includes(item)) {
    form.value.domains = form.value.domains.filter(i => i !== item)
  } else {
    form.value.domains.push(item)
  }
}

const submitInfo = () => {
  localStorage.setItem('user_profile', JSON.stringify(form.value))
  router.push('/dashboard')
}
</script>

<style scoped>
.profile-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at center, #0f0f23, #0a0a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: white;
}

.profile-panel {
  background: rgba(30, 30, 60, 0.9);
  border: 1px solid #f7c948;
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 460px;
  text-align: center;
  box-shadow: 0 0 30px #00000088;
}

.profile-title {
  font-family: 'Orbitron', 'Noto Serif SC', serif;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: gold;
}

.profile-description {
  font-family: 'Orbitron', 'Noto Serif SC', serif;
  font-size: 14px;
  margin-bottom: 25px;
  line-height: 1.8;
  color: #ddd;
}

.profile-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 25px;
  border: 1px solid gold;
  border-radius: 8px;
  background: #000;
  color: white;
  font-family: 'Orbitron', 'Noto Serif SC', serif;
  font-size: 16px;
}

.section-title {
  margin: 15px 0 10px;
  font-weight: bold;
  color: #facc15;
}

.level-options, .field-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.level-button, .field-button {
  padding: 8px 12px;
  border: 1px solid #999;
  border-radius: 999px;
  background: #1a1a2e;
  cursor: pointer;
  transition: all 0.2s;
}

.level-button.selected, .field-button.selected {
  background: linear-gradient(to right, #7f00ff, #e100ff);
  border-color: white;
  color: white;
}

.submit-button {
  margin-top: 15px;
  width: 100%;
  padding: 12px;
  font-family: 'Orbitron', 'Noto Serif SC', serif;
  font-size: 16px;
  font-weight: bold;
  background: linear-gradient(to right, #a855f7, #6366f1);
  color: white;
  border: none;
  border-radius: 999px;
  cursor: pointer;
}
</style>
