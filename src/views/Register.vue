<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')

const handleRegister = () => {
  if (!username.value || !password.value) {
    errorMsg.value = '用户名和密码不能为空'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = '两次输入的密码不一致'
    return
  }
  localStorage.setItem('token', 'mock-token')
  localStorage.setItem('blogName', username.value)
  localStorage.setItem('userPicture', 'https://randomuser.me/api/portraits/men/1.jpg')
  router.push('/posts')
}
</script>

<template>
  <div class="register-card">
    <h2>创建账号</h2>
    <p class="subtitle">加入博客社区</p>
    <input type="text" v-model="username" placeholder="用户名" />
    <input type="password" v-model="password" placeholder="密码" />
    <input type="password" v-model="confirmPassword" placeholder="确认密码" />
    <button @click="handleRegister">注册</button>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <div class="login-link">
      <router-link to="/login">已有账号？去登录</router-link>
    </div>
  </div>
</template>

<style scoped>
.register-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-align: center;
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease;
}

.register-card:hover {
  transform: translateY(-5px);
}

h2 {
  margin-bottom: 10px;
  color: #333;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 10px;
}

.login-link {
  margin-top: 20px;
  font-size: 14px;
}

.login-link a {
  color: #667eea;
  text-decoration: none;
}
</style>