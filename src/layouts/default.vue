<script lang="ts" setup>
const keepAliveList = [
  '/information/',
]
</script>

<template>
  <main class="relative min-h-full flex flex-col items-center justify-between overflow-hidden">
    <TheHeader />
    <div class="z-1 h-full w-full flex-col-center">
      <RouterView v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="keepAliveList.includes($route.name)" />
        </keep-alive>
        <component :is="Component" v-if="!keepAliveList.includes($route.name)" />
      </RouterView>
    </div>
    <TheFooter class="z-1" />
  </main>
</template>

<style scoped>

</style>
