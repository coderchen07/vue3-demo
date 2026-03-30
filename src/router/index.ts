import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Posts from '../views/Posts.vue'
import Details from '../views/Details.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    }
  ]
})

// 路由守卫：未登录不能访问 /posts 和 /details
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // 需要登录才能访问的页面
  const needAuth = ['Posts', 'Details']
  
  if (needAuth.includes(to.name as string) && !token) {
    // 未登录，跳转到登录页
    next('/login')
  } else {
    next()
  }
})

export default router