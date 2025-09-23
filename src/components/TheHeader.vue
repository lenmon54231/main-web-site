<script setup lang="ts">
import { getCurrentEnv, toPanorama } from '~/utils/common'

const headerItemList = ref([
  { id: 'home', name: 'HOME', path: '/',
  },
  { id: 'introduction', name: 'PROJECTS', path: '/introduction' },
  {
    id: 'guide',
    name: 'ABOUT',
    path: '/guide',
  },
  {
    id: 'panorama',
    name: 'PANORAMA',
    path: '/panorama',
  },
])

const env = ref('pc')

onMounted(async () => {
  env.value = await getCurrentEnv()
})

const isShowMenuList = ref(false)
function showMenuList() {
  isShowMenuList.value = true
  stop()
}
function closeMenuList() {
  isShowMenuList.value = false
  move()
}
function stop() {
  document.body.style.overflow = 'hidden'
};

function move() {
  document.body.style.overflow = 'auto'
}

function toPanoramaAndClose() {
  closeMenuList()
  toPanorama()
}

const activeHeaderId = ref('home')
function updateActiveHeaderId(e: string) {
  activeHeaderId.value = e
}

const route = useRoute()
watch(() => route.path, async () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})
</script>

<template>
  <nav
    :class="[
      env === 'pc' ? 'h-80px' : 'h-54px',
    ]"
    class="fixed z-2 w-full flex-row-center text-16px color-semantic-200 font-600 tracking-wider"
  >
    <TheMobileHeader @show-menu-list="showMenuList" />
    <ThePcHeader
      :header-item-list="headerItemList"
      @to-panorama="toPanoramaAndClose"
      @update-active-header-id="updateActiveHeaderId"
    />
  </nav>
  <TheMobileHeaderDrawer
    :is-show-menu-list="isShowMenuList"
    :header-item-list="headerItemList"
    @close="closeMenuList"
    @to-panorama="toPanoramaAndClose"
  />
</template>

<style scoped>
</style>
