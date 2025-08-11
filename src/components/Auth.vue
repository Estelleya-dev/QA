<template>
  <div class="auth-overlay">
    <div class="auth-panel">
      <div class="auth-title">高维智慧认证</div>
      <div class="auth-description">
        ⚠️ 为了为您定制最适合的高维智慧方案，请如实填写以下信息：<br /><br />
        ✨ 出生日期：用于匹配您的能量频率特征<br />
        🎯 显化等级：帮助我们调整指导深度<br />
        🌈 关注领域：定制专属的智慧内容<br /><br />
        您的信息将被严格加密保护，仅用于个性化服务优化。
      </div>

      <input
          type="text"
          class="auth-input"
          v-model="authCode"
          placeholder="请输入授权码"
      />
      <button class="auth-button" @click="validateAuthCode">验证授权码</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authCode = ref('')

function validateAuthCode() {
  const validCodes = ['QUANTUM2025', 'WISDOM2025']

  if (validCodes.includes(authCode.value.trim().toUpperCase())) {
    router.push('/profile') // ✅ 验证成功后跳转
  } else {
    alert('授权码无效，请重新输入')
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 75%, #000000 100%);
  background-attachment: fixed;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
      radial-gradient(2px 2px at 20px 30px, rgba(255, 215, 0, 0.3), transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.2), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(255, 215, 0, 0.4), transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.3), transparent),
      radial-gradient(2px 2px at 160px 30px, rgba(138, 43, 226, 0.3), transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: twinkle 3s infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

.quantum-title {
  font-family: 'Orbitron', 'Noto Serif SC', serif;
  background: linear-gradient(135deg, #ffd700 0%, #ff6b6b 25%, #4ecdc4 50%, #45b7d1 75%, #ffd700 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-flow 4s ease infinite;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
}

.classical-subtitle {
  font-family: 'Noto Serif SC', serif;
  color: #c9b037;
  text-shadow: 0 0 20px rgba(201, 176, 55, 0.6);
}

@keyframes gradient-flow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.sun-symbol {
  font-size: 3rem;
  color: #ffd700;
  text-shadow: 0 0 20px #ffd700, 0 0 40px #ffd700;
  animation: pulse-glow 2s ease-in-out infinite alternate, rotate-glow 10s linear infinite;
  filter: drop-shadow(0 0 20px #ffd700);
}

.moon-symbol {
  font-size: 2rem;
  color: #c9c9c9;
  text-shadow: 0 0 15px #c9c9c9, 0 0 30px #c9c9c9;
  animation: gentle-glow 3s ease-in-out infinite alternate, float-motion 4s ease-in-out infinite;
}

@keyframes pulse-glow {
  from { text-shadow: 0 0 20px #ffd700, 0 0 40px #ffd700; }
  to { text-shadow: 0 0 30px #ffd700, 0 0 60px #ffd700, 0 0 80px #ffd700; }
}

@keyframes rotate-glow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes gentle-glow {
  from { text-shadow: 0 0 15px #c9c9c9, 0 0 30px #c9c9c9; }
  to { text-shadow: 0 0 25px #c9c9c9, 0 0 45px #c9c9c9; }
}

@keyframes float-motion {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.main-container {
  display: flex;
  min-height: 100vh;
  position: relative;
  z-index: 2;
}

.sidebar {
  width: 300px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 215, 0, 0.2);
  padding: 20px;
  transition: transform 0.3s ease;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
}

.sidebar.collapsed {
  transform: translateX(-280px);
}

.sidebar-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(138, 43, 226, 0.8);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 101;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-toggle:hover {
  background: rgba(138, 43, 226, 1);
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.5);
}

.sidebar-toggle.collapsed {
  left: 20px;
}

.content-container {
  flex: 1;
  margin-left: 300px;
  padding: 20px;
  transition: margin-left 0.3s ease;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin: 20px;
}

.content-container.sidebar-collapsed {
  margin-left: 20px;
}

.sidebar-section {
  margin-bottom: 25px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.sidebar-title {
  font-family: 'Orbitron', 'Noto Serif SC', serif;
  color: #ffd700;
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
}

.usage-info {
  color: #c9c9c9;
  font-size: 14px;
  text-align: center;
  margin-bottom: 15px;
}

.quick-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.quick-btn {
  flex: 1;
  padding: 8px 12px;
  background: rgba(138, 43, 226, 0.2);
  border: 1px solid rgba(138, 43, 226, 0.3);
  border-radius: 20px;
  color: #8a2be2;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
  text-align: center;
}

.quick-btn:hover {
  background: rgba(138, 43, 226, 0.4);
  border-color: #8a2be2;
}

.knowledge-section {
  max-height: 300px;
  overflow-y: auto;
}

.knowledge-item {
  padding: 8px 12px;
  margin-bottom: 5px;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 8px;
  color: #ffd700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.knowledge-item:hover {
  background: rgba(255, 215, 0, 0.2);
}

.chat-container {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(138, 43, 226, 0.3);
  border-radius: 15px;
  height: 500px;
  overflow-y: auto;
  padding: 20px;
  margin-bottom: 20px;
}

.message {
  margin: 15px 0;
  padding: 15px 20px;
  border-radius: 12px;
  animation: fadeIn 0.5s ease-in;
  font-family: 'Noto Serif SC', serif;
  line-height: 1.6;
}

.user-message {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(75, 0, 130, 0.3));
  border-left: 3px solid #8a2be2;
  margin-left: 20px;
  color: #e6e6fa;
}

.ai-message {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.2));
  border-left: 3px solid #ffd700;
  margin-right: 20px;
  color: #ffffff;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.input-container {
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 25px;
  padding: 5px;
  align-items: center;
}

.input-field {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-family: 'Noto Serif SC', serif;
  padding: 12px 20px;
  font-size: 14px;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.send-button {
  background: linear-gradient(135deg, #8a2be2, #4b0082);
  border: none;
  color: white;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-button:hover {
  background: linear-gradient(135deg, #9932cc, #6a0dad);
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
}

.send-button:disabled {
  background: rgba(138, 43, 226, 0.3);
  cursor: not-allowed;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.header .subtitle {
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.header .description {
  font-size: 1rem;
  color: #c9c9c9;
  max-width: 600px;
  margin: 0 auto;
}

.footer {
  text-align: center;
  margin-top: 30px;
  padding: 20px;
}

.footer-brand {
  font-family: 'Orbitron', 'Noto Serif SC', serif;
  background: linear-gradient(90deg, #ffd700, #c9b037, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 500;
}

.auth-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(15px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-panel {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.auth-title {
  font-family: 'Orbitron', 'Noto Serif SC', serif;
  color: #ffd700;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 20px;
}

.auth-description {
  color: #c9c9c9;
  text-align: center;
  margin-bottom: 30px;
  font-size: 14px;
  line-height: 1.5;
}

.auth-input {
  width: 100%;
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 25px;
  color: white;
  font-family: 'Noto Serif SC', serif;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;
}

.auth-input:focus {
  border-color: #ffd700;
  outline: none;
}

.auth-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.auth-button {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #8a2be2, #4b0082);
  border: none;
  border-radius: 25px;
  color: white;
  font-family: 'Noto Serif SC', serif;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 15px;
  font-size: 16px;
}

.auth-button:hover {
  background: linear-gradient(135deg, #9932cc, #6a0dad);
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
}

.level-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin: 20px 0;
}

.level-option {
  padding: 12px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 15px;
  color: #ffd700;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
}

.level-option:hover, .level-option.selected {
  background: rgba(255, 215, 0, 0.3);
  border-color: #ffd700;
}

.field-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 20px 0;
}

.field-option {
  padding: 12px;
  background: rgba(138, 43, 226, 0.1);
  border: 1px solid rgba(138, 43, 226, 0.3);
  border-radius: 15px;
  color: #8a2be2;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
}

.field-option:hover, .field-option.selected {
  background: rgba(138, 43, 226, 0.3);
  border-color: #8a2be2;
}

.loading-text {
  color: #ffd700;
  font-style: italic;
  text-align: center;
  padding: 20px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

.usage-counter {
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  color: #ffd700;
  font-size: 14px;
  margin-bottom: 15px;
}

.personal-knowledge {
  max-height: 200px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 10px;
}

.knowledge-entry {
  padding: 8px;
  margin-bottom: 5px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  font-size: 12px;
  color: #c9c9c9;
}

.knowledge-entry .question {
  color: #8a2be2;
  font-weight: bold;
}

.knowledge-entry .answer {
  color: #ffd700;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 280px;
  }

  .content-container {
    margin-left: 0;
    margin: 10px;
  }

  .sidebar.collapsed {
    transform: translateX(-260px);
  }

  .header h1 {
    font-size: 2rem;
  }

  .header .subtitle {
    font-size: 1rem;
  }

  .auth-panel {
    padding: 30px 20px;
  }
}
</style>
