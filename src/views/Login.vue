<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMsg = ref('')

const handleLogin = () => {
  if (username.value && password.value) {
    localStorage.setItem('token', 'mock-token')
    localStorage.setItem('blogName', username.value)
    localStorage.setItem('userPicture', 'https://randomuser.me/api/portraits/men/1.jpg')
    router.push('/posts')
  } else {
    errorMsg.value = '请输入用户名和密码'
  }
}
</script>

<template>
  <div class="login-card">
    <h2>欢迎回来</h2>
    <p class="subtitle">登录你的博客账号</p>
    <input type="text" v-model="username" placeholder="用户名" />
    <input type="password" v-model="password" placeholder="密码" />
    <button @click="handleLogin">登录</button>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <div class="register-link">
      <router-link to="/register">没有账号？立即注册</router-link>
    </div>
  </div>
</template>

<style scoped>
.login-card {
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

.login-card:hover {
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
  transition: border 0.2s;
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
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.9;
}

.error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 10px;
}

.register-link {
  margin-top: 20px;
  font-size: 14px;
}

.register-link a {
  color: #667eea;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>