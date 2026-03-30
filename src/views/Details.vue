<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import showdown from 'showdown'
import 'github-markdown-css/github-markdown.css'

const route = useRoute()
const articleId = Number(route.params.id)

interface ArticleDetail {
  id: number
  title: string
  content: string
  authorName: string
  authorAvatar: string
  likeCount: number
  isLiked: boolean
  collectCount: number
  isCollected: boolean
  publishDate: string
}

const article = ref<ArticleDetail | null>(null)
const htmlContent = ref('')
const loading = ref(true)

const fetchArticleDetail = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 300))
  const data: ArticleDetail = articleId === 1 ? {
    id: 1,
    title: 'Vue3 组合式 API 入门指南',
    content: `这是一篇关于 Vue3 组合式 API 的详细文章。

## 什么是组合式 API

组合式 API 是 Vue3 中新增的编写组件逻辑的方式，它允许我们按功能组织代码，而不是按选项（data、methods等）。

## 核心函数

- **ref**: 用于定义响应式数据
- **reactive**: 用于定义响应式对象
- **computed**: 计算属性
- **watch**: 侦听器

## 优势

- 更好的逻辑复用
- 更清晰的代码组织
- 更好的 TypeScript 支持`,
    authorName: '小明',
    authorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    likeCount: 12,
    isLiked: false,
    collectCount: 5,
    isCollected: false,
    publishDate: '2025-03-01'
  } : {
    id: 2,
    title: 'TypeScript 在前端项目中的实践',
    content: `TypeScript 是 JavaScript 的超集，为大型项目提供了类型安全。

## 为什么要用 TypeScript

- 静态类型检查，减少运行时错误
- 更好的 IDE 支持
- 代码更易于维护

## 基本用法

\`\`\`typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: '张三',
  age: 18
};
\`\`\`

## 在 Vue3 中使用

Vue3 对 TypeScript 有很好的支持，组合式 API 可以轻松定义类型。`,
    authorName: '小红',
    authorAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    likeCount: 8,
    isLiked: false,
    collectCount: 3,
    isCollected: false,
    publishDate: '2025-03-05'
  }
  article.value = data
  const converter = new showdown.Converter()
  htmlContent.value = converter.makeHtml(data.content)
  loading.value = false
}

// 辅助提示（简单alert，你也可以换成更好的toast）
const showToast = (msg: string) => {
  alert(msg)
}

const handleLike = async () => {
  if (!article.value) return
  const oldLiked = article.value.isLiked
  const oldCount = article.value.likeCount

  article.value.isLiked = !article.value.isLiked
  article.value.likeCount += article.value.isLiked ? 1 : -1

  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.1 ? resolve(true) : reject('网络错误')
      }, 500)
    })
    showToast(article.value!.isLiked ? '点赞成功！' : '已取消点赞')
  } catch {
    article.value!.isLiked = oldLiked
    article.value!.likeCount = oldCount
    showToast('点赞失败，请重试')
  }
}

const handleCollect = async () => {
  if (!article.value) return
  const oldCollected = article.value.isCollected
  const oldCount = article.value.collectCount

  article.value.isCollected = !article.value.isCollected
  article.value.collectCount += article.value.isCollected ? 1 : -1

  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.1 ? resolve(true) : reject('网络错误')
      }, 500)
    })
    showToast(article.value!.isCollected ? '收藏成功！' : '已取消收藏')
  } catch {
    article.value!.isCollected = oldCollected
    article.value!.collectCount = oldCount
    showToast('收藏失败，请重试')
  }
}

onMounted(() => {
  fetchArticleDetail()
})
</script>

<template>
  <div class="detail-container">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="article" class="detail-card">
      <h1>{{ article.title }}</h1>
      <div class="author-info">
        <img :src="article.authorAvatar" class="avatar" />
        <span>{{ article.authorName }}</span>
        <span>发布于 {{ article.publishDate }}</span>
      </div>
      <div class="actions">
        <button 
          @click="handleLike" 
          class="action-btn" 
          :class="{ active: article.isLiked }"
        >
          👍 {{ article.likeCount }}
        </button>
        <button 
          @click="handleCollect" 
          class="action-btn" 
          :class="{ active: article.isCollected }"
        >
          ⭐ {{ article.collectCount }}
        </button>
      </div>
      <div class="content markdown-body" v-html="htmlContent"></div>
    </div>
    <div v-else class="error-card">文章不存在</div>
  </div>
</template>

<style scoped>
.detail-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.detail-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

h1 {
  margin-bottom: 20px;
  color: #333;
  font-size: 2rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  color: #666;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.action-btn {
  padding: 8px 20px;
  font-size: 16px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: all 0.2s;
}

.action-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.content {
  margin-top: 20px;
  line-height: 1.7;
  color: #333;
}

.loading, .error-card {
  text-align: center;
  color: white;
  font-size: 18px;
  background: rgba(0,0,0,0.5);
  padding: 40px;
  border-radius: 20px;
}
</style>