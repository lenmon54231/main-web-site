<script lang="ts" setup>
const keepAliveList = [
  '/information/',
]

const fullPageList = [
  '/login/',
]
</script>

<template>
  <main v-if="!fullPageList.includes($route.name)" class="relative min-h-full flex flex-col items-center justify-between overflow-hidden">
    <TheHeader />
    <div class="z-1 h-full w-full flex-col-center flex-1">
      <RouterView v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="keepAliveList.includes($route.name)" />
        </keep-alive>
        <component :is="Component" v-if="!keepAliveList.includes($route.name)" />
      </RouterView>
    </div>
    <TheFooter class="z-1" />
  </main>
  <main v-else>
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </main>
</template>

<style scoped>

</style>
