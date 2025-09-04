<script setup lang="ts">
import { getCurrentEnv } from '~/utils/common'

const env = ref('pc')
onMounted(async () => {
  env.value = await getCurrentEnv()
})

const index = ref(1)
function add() {
  index.value++
}
</script>

<template>
  <div :class="env === 'pc' ? 'mt--80px mb-80px' : 'mt-0px mb-0px'" class="h-full w-full flex-col-center">
    <div>点击添加按钮</div>
    <div>
      来测试keepalive效果
    </div>
    <div class="text-36px font-600">
      {{ index }}
    </div>
    <button class="mt-12px rounded-6px bg-purple px-44px py-6px color-#fff" @click="add">
      添加
    </button>
  </div>
</template>

<style scoped>

</style>
