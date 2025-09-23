<script setup lang="ts">
import { getCurrentEnv } from '~/utils/common'

const env = ref('pc')
onMounted(async () => {
  env.value = await getCurrentEnv()
})
</script>

<template>
  <div :class="env === 'pc' ? 'mt--80px' : 'mt-0px mb-0px'" class="h-full w-full flex-col-center flex-1 bg-dark">
    <ThreeViewer />
  </div>
</template>

<style scoped>

</style>
