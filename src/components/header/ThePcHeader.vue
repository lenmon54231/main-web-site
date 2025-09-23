<script setup lang="ts">
import logoImage from '~/assets/image/header_logo.png'

interface Props {
  headerItemList?: any
  env?: string
}

withDefaults(defineProps<Props>(), {
  headerItemList: () => [],
  env: 'pc',
})

const emits = defineEmits(['toPanorama', 'updateActiveHeaderId'])

function toPanorama() {
  emits('toPanorama')
}

const activeHeaderId = ref('home')

const changeActiveHeaderId = function (id: string) {
  activeHeaderId.value = id
  emits('updateActiveHeaderId', id)
}

const route = useRoute()
watch(() => route.path, async (n) => {
  const nPath = n !== '/' && n ? n.split('/')[1] : 'home'
  changeActiveHeaderId(nPath)
})

onMounted(() => {
  const path = route.path !== '/' && route.path ? route.path.split('/')[1] : 'home'
  changeActiveHeaderId(path)
})
</script>

<template>
  <div class="mx-15px hidden h-full max-w-1300px w-full items-center justify-between lg:flex">
    <div class="h-full flex-row-start">
      <img
        class="h-70%"
        :src="logoImage"
        object-cover
      >
      <div class="mb-7px ml-10px text-36px font-600 tracking-wider">
        Voyager
      </div>
    </div>
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
