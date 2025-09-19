<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import service from '~/utils/axios'

const router = useRouter()
const isLogin = ref(true)
const loading = ref(false)

const loginForm = reactive({
  email: '',
  password: '',
})

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
})

function toggleMode() {
  isLogin.value = !isLogin.value
}

async function handleLogin() {
  loading.value = true

  service.post('/api/auth/login', loginForm).then((res) => {
    const { message, token, user } = res
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    toast.success(message, {
      duration: 1500,
    })
    // 跳转到用户信息页
    router.push('/')
  }).finally(() => {
    loading.value = false
  })
}

async function handleRegister() {
  loading.value = true
  service.post('/api/auth/register', registerForm).then((res) => {
    const { message } = res
    toast.success(message, {
      duration: 1500,
    })
    registerForm.username = ''
    registerForm.email = ''
    registerForm.password = ''
    // 转到登录界面
    isLogin.value = true
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full rounded-lg bg-white p-8 shadow-md">
      <!-- 登录表单 -->
      <form v-if="isLogin" class="space-y-6" @submit.prevent="handleLogin">
        <h2 class="text-center text-2xl text-gray-800 font-bold">
          用户登录
        </h2>

        <div>
          <label class="mb-2 block text-sm text-gray-700 font-medium">邮箱地址</label>
          <input
            v-model="loginForm.email"
            type="text"
            required
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入邮箱地址"
          >
        </div>

        <div>
          <label class="mb-2 block text-sm text-gray-700 font-medium">密码</label>
          <input
            v-model="loginForm.password"
            type="password"
            required
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入密码"
          >
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <p class="text-center text-sm text-gray-600">
          还没有账号？
          <button type="button" class="text-blue-600 hover:underline" @click="toggleMode">
            立即注册
          </button>
        </p>
      </form>

      <!-- 注册表单 -->
      <form v-else class="space-y-6" @submit.prevent="handleRegister">
        <h2 class="text-center text-2xl text-gray-800 font-bold">
          用户注册
        </h2>

        <div>
          <label class="mb-2 block text-sm text-gray-700 font-medium">用户名</label>
          <input
            v-model="registerForm.username"
            type="text"
            required
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入用户名"
          >
        </div>

        <div>
          <label class="mb-2 block text-sm text-gray-700 font-medium">邮箱</label>
          <input
            v-model="registerForm.email"
            type="email"
            required
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入邮箱"
          >
        </div>

        <div>
          <label class="mb-2 block text-sm text-gray-700 font-medium">密码</label>
          <input
            v-model="registerForm.password"
            type="password"
            required
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入密码"
          >
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {{ loading ? '注册中...' : '注册' }}
        </button>

        <p class="text-center text-sm text-gray-600">
          已有账号？
          <button type="button" class="text-blue-600 hover:underline" @click="toggleMode">
            立即登录
          </button>
        </p>
      </form>
    </div>
  </div>
</template>
