<script setup lang="ts">
import logoImage from '~/assets/image/header_logo.png'

const { t } = useI18n()

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

function buyTicket() {
  emits('buyTicket')
}

function toggleLocales() {
  emits('toggleLocales')
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
  <div
    v-for="(item, index) in headerItemList"
    :key="index"
    class="h-full w-76px flex-col-center text-center"
    :class="item.id === 'logo' ? 'flex-1 max-w-216px max-h-54px mx-15px' : 'max-w-76px w-76px'"
  >
    <div
      v-if="item.id === 'language'"
      class="group mb-1 h-25px cursor-pointer overflow-hidden"
      @click="toggleLocales()"
    >
      <div class="translate-y-0 transition-all group-hover:translate-y-[-50%]">
        <div min-w-76px>
          {{ t('header.language') }}
        </div>
        <div min-w-76px :class="activeHeaderId === 'home' && isTop ? 'color-semantic-100' : 'color-#fac52b' ">
          {{ t('header.reverse_language') }}
        </div>
      </div>
    </div>
    <div
      v-else-if="item.id === 'panorama'"
      class="header-item-container"
      :class="activeHeaderId === item.id ? 'active' : ''"
      @click="toPanorama"
    >
      {{ t(item.name) }}
    </div>
    <div
      v-else-if="item.id === 'ticket'"
      class="header-item-container"
      :class="activeHeaderId === item.id ? 'active' : ''"
      @click="buyTicket"
    >
      {{ t(item.name) }}
    </div>
    <img
      v-else-if="item.id === 'logo'"
      h-full
      :src="logoImage"
    >
    <RouterLink
      v-else
      class="header-item-container"
      :class="activeHeaderId === item.id ? 'active' : ''"
      :to="item.path"
      @click="changeActiveHeaderId(item.id)"
    >
      <div class="router-link-text">
        {{ t(item.name) }}
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.header-item-container {
  @apply position-relative h-full flex-row-center w-full pb-1;
  @apply cursor-pointer;
}

.header-item-container::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 4px;
}

.header-item-container:hover::before {
  background-color: #fac52b;
}

.active::before {
  background-color: #fac52b;
}

.active > .router-link-text {
  text-shadow: 3px 2px 12px rgba(255, 255, 255, 0.88);
}
</style>
