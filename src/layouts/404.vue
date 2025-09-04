<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main min-h-full flex flex-col items-center justify-between>
    <div w-full flex flex-1 flex-col items-center justify-center>
      <RouterView />
      <button mt-3 text-lg btn @click="router.back()">
        {{ t('button.back') }}
      </button>
    </div>
  </main>
</template>
