<script setup lang="ts">
import homeBCImage from '~/assets/image/home/home_bc.webp'

defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div class="w-full flex flex-1 flex-col items-center justify-start bg-blue">
    <!-- 首屏大图 -->
    <div class="big-home-image-container relative w-full overflow-hidden">
      <img class="h-full w-full object-cover" :src="homeBCImage">
    </div>
    <div class="mt-103px text-44px font-800 lg:text-62px">
      Where the world builds software
    </div>
  </div>
</template>

<style scoped>
.big-home-image-container {
  height: calc(100vh - 56px);
  @apply lg:h-100vh;
}

.marking-info-container {
  @apply hidden;
  @apply lg:w-full lg:h-200px lg:block lg:flex-col-start;
  background: linear-gradient(180deg, rgba(201, 180, 114, 0) 0%, rgba(0, 214, 253, 0.5) 100%);
}
</style>
