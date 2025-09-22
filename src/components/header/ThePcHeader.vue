<script setup lang="ts">
import logoImage from '~/assets/image/header_logo.png'

interface Props {
  headerItemList?: any
  env?: string
}
const props = withDefaults(defineProps<Props>(), {
  headerItemList: () => [],
  env: 'pc',
})

const emits = defineEmits(['toggleLocales', 'toPanorama', 'updateIsTop', 'updateActiveHeaderId', 'buyTicket'])

function toPanorama() {
  emits('toPanorama')
}

const activeHeaderId = ref('home')

onMounted(async () => {
  if (props.env === 'pc' && activeHeaderId.value === 'home') {
    addScrollEvent()
  }
})

async function addScrollEvent() {
  window.addEventListener('scroll', changeHeaderStyle)
}

const isTop = ref(true)
function changeHeaderStyle() {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop
  if (scrollPosition === 0) {
    emits('updateIsTop', true)
    isTop.value = true
  }
  else {
    emits('updateIsTop', false)
    isTop.value = false
  }
}

const changeActiveHeaderId = function (id: string) {
  activeHeaderId.value = id
  emits('updateActiveHeaderId', id)
}

const route = useRoute()
watch(() => route.path, async (n) => {
  const nPath = n !== '/' && n ? n.split('/')[1] : 'home'
  changeActiveHeaderId(nPath)
  changeHeaderStyle()
  if (props.env === 'pc' && props.headerItemList.find((e: { isTrans: any, id: string }) => e.isTrans && nPath === e.id)) {
    // 跳转到首页时，添加滚动事件监听
    addScrollEvent()
  }
  else {
    // 离开首页时，移除滚动事件监听
    removeScrollEvent()
  }
})

onMounted(() => {
  const path = route.path !== '/' && route.path ? route.path.split('/')[1] : 'home'
  changeActiveHeaderId(path)
})

onUnmounted(() => {
  removeScrollEvent()
})

function removeScrollEvent() {
  window.removeEventListener('scroll', changeHeaderStyle)
}
</script>

<template>
  <div class="mx-15px hidden h-full max-w-1300px w-full items-center justify-between lg:flex">
    <img
      class="mt-8px w-100px sm:mt-0px sm:max-w-216px"
      :src="logoImage"
      object-cover
    >
    <div class="h-full flex-row-around">
      <div
        v-for="(item, index) in headerItemList"
        :key="index"
        class="mx-15px h-full max-w-76px w-76px w-76px flex-col-center text-center"
      >
        <div
          v-if="item.id === 'panorama'"
          class="header-item-container"
          :class="activeHeaderId === item.id ? 'active' : ''"
          @click="toPanorama"
        >
          {{ item.name }}
        </div>
        <RouterLink
          v-else
          class="header-item-container"
          :class="activeHeaderId === item.id ? 'active' : ''"
          :to="item.path"
          @click="changeActiveHeaderId(item.id)"
        >
          <div class="router-link-text">
            {{ item.name }}
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-item-container {
  @apply position-relative h-full flex-row-center w-full pb-1 color-semantic-200;
  @apply cursor-pointer;
}

.header-item-container::before {
  content: '';
  position: absolute;
  top: 13px;
  left: 50%;
  transform: translateX(-50%);
  width: 74%;
  height: 4px;
  border-radius: 4px;
}

.header-item-container:hover::before,
.active::before {
  @apply bg-red;
}

.active > .router-link-text {
  text-shadow: 3px 2px 12px rgba(0, 0, 0, 0.2);
}
</style>
