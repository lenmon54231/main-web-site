<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <div text-center text-8xl color-black font-700>
      404
    </div>
    <div mt-1 text-center text-xl color-coolgray>
      {{ t('not-found') }}
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
