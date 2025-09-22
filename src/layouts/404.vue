<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main min-h-full flex flex-col items-center justify-between>
    <div w-full flex flex-1 flex-col items-center justify-center>
      <RouterView />
      <button mt-3 text-lg btn @click="router.back()">
        返回
      </button>
    </div>
  </main>
</template>
