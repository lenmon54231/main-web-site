<script setup lang="ts">
import { getCurrentEnv, toPanorama } from '~/utils/common'

const headerItemList = ref([
  { id: 'home', name: '敦煌', path: '/',
  },
  { id: 'introduction', name: '接口测试', path: '/introduction' },
  {
    id: 'guide',
    name: '模型展示',
    path: '/guide',
  },
  {
    id: 'panorama',
    name: '全景图',
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

const headInfo = {
  title: '小破站',
  meta: [
    {
      name: 'description',
      content: 'panorama, AR',
    },
  ],
  link: [
    {
      rel: 'icon',
      href: () => '/favicon.png',
    },
  ],
}
useHead(headInfo)

function toPanoramaAndClose() {
  closeMenuList()
  toPanorama()
}

const isTop = ref(true)
function updateIsTop(e: boolean) {
  isTop.value = e
}

const activeHeaderId = ref('home')
function updateActiveHeaderId(e: string) {
  activeHeaderId.value = e
}

const isNavTrans = computed(() => {
  let pass = false
  if (headerItemList.value.find(e => e.isTrans && activeHeaderId.value === e.id) && isTop.value && env.value === 'pc') {
    pass = true
  }
  return pass
})

const route = useRoute()
watch(() => route.path, async () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})
</script>

<template>
  <nav
    :class="[
      isNavTrans ? ' color-semantic-100' : ' color-semantic-200',
      env === 'pc' ? 'h-80px' : 'h-54px',
    ]"
    class="fixed z-2 w-full flex-row-center text-16px font-600 tracking-wider"
  >
    <TheMobileHeader @show-menu-list="showMenuList" />
    <ThePcHeader
      :header-item-list="headerItemList"
      @to-panorama="toPanoramaAndClose"
      @update-is-top="updateIsTop"
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
