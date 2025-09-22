<script setup lang="ts">
import { getCurrentEnv } from '~/utils/common'
import service from '~/utils/axios'

const env = ref('pc')
onMounted(async () => {
  env.value = await getCurrentEnv()
})

const email = ref('')
async function addUser() {
  if (email.value) {
    await service.post('/api/users', { username: '111', email: email.value, password: '123456' })
    getUsersList()
  }
}

const usersList = ref([])
async function getUsersList() {
  const res = await service.get('/api/users')
  usersList.value.length = 0
  if (res.length > 0) {
    usersList.value.push(...res)
  }
}

getUsersList()

async function deleteUsers(item) {
  const { _id } = item
  if (_id) {
    await service.delete(`/api/users/${_id}`)
    getUsersList()
  }
}

async function updateUsers(item) {
  const { _id, name } = item
  if (_id && name) {
    await service.put(`/api/users/${_id}`, { name })
    getUsersList()
  }
}
</script>

<template>
  <div class="w-full flex-col-center flex-1 bg-blue">
    <div class="flex-center">
      <input v-model="email" class="mr-20px h-40px rounded-4px bg-#eee" type="text">
      <button class="mt-12px h-40px w-120px rounded-4px bg-#eee hover:bg-#788 hover:color-#fff" @click="addUser">
        新增用户
      </button>
    </div>
    <div class="mt-12px">
      <div v-for="item in usersList" :key="item._id" class="mt-12px flex-row-center">
        <input v-model="item.username" class="mr-20px h-40px rounded-4px bg-#eee" type="text">
        <input v-model="item.email" class="mr-20px h-40px rounded-4px bg-#eee" type="text">
        <button class="mr-12px h-40px w-120px rounded-4px bg-#eee hover:bg-#788 hover:color-#fff" @click="updateUsers(item)">
          更新名称
        </button>
        <button class="h-40px w-120px rounded-4px bg-red color-#fff hover:bg-#788" @click="deleteUsers(item)">
          删除
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
