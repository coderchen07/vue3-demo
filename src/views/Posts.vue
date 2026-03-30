<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Post {
  id: number
  title: string
  summary: string
  authorName: string
  authorAvatar: string
  coverImage?: string
  likeCount: number
  isLiked: boolean
  commentCount: number
  collectionCount: number
  readCount: number
  publishDate: string
}

const posts = ref<Post[]>([])
const loading = ref(true)

const fetchPosts = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  posts.value = [
    {
      id: 1,
      title: 'Vue3 组合式 API 入门指南',
      summary: '本文介绍 Vue3 的组合式 API 的基本用法，包括 ref、reactive、computed、watch 等核心概念。',
      authorName: '小明',
      authorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      coverImage: 'https://picsum.photos/280/150?random=1',
      likeCount: 12,
      isLiked: false,
      commentCount: 3,
      collectionCount: 5,
      readCount: 100,
      publishDate: '2025-03-01'
    },
    {
      id: 2,
      title: 'TypeScript 在前端项目中的实践',
      summary: '如何利用 TypeScript 提升代码可维护性，包括接口定义、类型推断、泛型等实际应用。',
      authorName: '小红',
      authorAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      coverImage: 'https://picsum.photos/280/150?random=2',
      likeCount: 8,
      isLiked: false,
      commentCount: 2,
      collectionCount: 3,
      readCount: 80,
      publishDate: '2025-03-05'
    }
  ]
  loading.value = false
}

// 点赞（乐观更新 + 提示）
const handleLike = async (post: Post) => {
  const oldLiked = post.isLiked
  const oldCount = post.likeCount

  // 乐观更新
  post.isLiked = !post.isLiked
  post.likeCount += post.isLiked ? 1 : -1

  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // 模拟 90% 成功率
        Math.random() > 0.1 ? resolve(true) : reject('网络错误')
      }, 500)
    })
    // 成功提示
    alert(post.isLiked ? '点赞成功！' : '已取消点赞')
  } catch (error) {
    // 失败回滚
    post.isLiked = oldLiked
    post.likeCount = oldCount
    alert('点赞失败，请重试')
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="posts-container">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else class="posts-grid">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <div class="post-cover">
          <img :src="post.coverImage" alt="cover" />
        </div>
        <div class="post-info">
          <h3>{{ post.title }}</h3>
          <p>{{ post.summary }}</p>
          <div class="post-meta">
            <span><img :src="post.authorAvatar" class="avatar" /> {{ post.authorName }}</span>
            <span>📅 {{ post.publishDate }}</span>
            <button 
              @click="handleLike(post)" 
              class="like-btn" 
              :class="{ liked: post.isLiked }"
            >
              👍 {{ post.likeCount }}
            </button>
            <span>💬 {{ post.commentCount }}</span>
            <span>⭐ {{ post.collectionCount }}</span>
            <span>👁️ {{ post.readCount }}</span>
          </div>
          <router-link :to="`/details/${post.id}`" class="read-more">阅读全文 →</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.posts-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.posts-grid {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.post-card {
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.post-cover {
  flex: 0 0 200px;
}

.post-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.post-info {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.post-info h3 {
  margin-bottom: 10px;
  color: #333;
  font-size: 1.3rem;
}

.post-info p {
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
  flex: 1;
}

.post-meta {
  display: flex;
  gap: 15px;
  font-size: 13px;
  color: #777;
  margin-bottom: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
}

.like-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 20px;
  transition: all 0.2s;
}

.like-btn:hover {
  background-color: rgba(102, 126, 234, 0.1);
}

.like-btn.liked {
  color: #e74c3c;
  font-weight: bold;
}

.read-more {
  align-self: flex-start;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  transition: background 0.2s;
}

.read-more:hover {
  background-color: rgba(102, 126, 234, 0.1);
}

.loading {
  text-align: center;
  color: white;
  font-size: 18px;
  padding: 40px;
}

@media (max-width: 768px) {
  .post-card {
    flex-direction: column;
  }
  .post-cover {
    flex: 0 0 180px;
  }
}
</style>