<script setup lang="ts">
import { TransitionChild, TransitionRoot } from '@headlessui/vue'

interface Props {
  isShowMenuList?: boolean
  headerItemList?: any
}

withDefaults(defineProps<Props>(), {
  isShowMenuList: false,
  headerItemList: () => [],
})

const emits = defineEmits(['close'])

function close() {
  emits('close')
}
</script>

<template>
  <TransitionRoot :show="isShowMenuList" appear fixed z-3 h-full w-full>
    <TransitionChild
      enter="transition-opacity ease-linear duration-300"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leave-from="opacity-100"
      leave-to="opacity-0"
      class="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black/50"
    />

    <TransitionChild
      enter="transition-all ease-in-out duration-300"
      enter-from="translate-x-100%"
      enter-to="translate-x-0"
      leave="transition-all ease-in-out duration-300"
      leave-from="translate-x-0"
      leave-to="translate-x-100%"
      class="w-2/3 bg-white/95"
      absolute bottom-0 right-0 top-0 h-full min-w-220px overflow-auto pt-52px
    >
      <div class="w-2/3" fixed right-0 top-0 h-56px flex-row-end>
        <div i-carbon:close-large mr-12px text-2xl color-semantic-800 @click="close" />
      </div>
      <div
        v-for="(item, index) in headerItemList" :key="index"
      >
        <RouterLink
          :to="item.path"
          class="mobile-menu-item flex-row-start border-b-1 border-b-semantic-700/30 pl-34px"
          @click="close"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </TransitionChild>
  </TransitionRoot>
</template>

<style scoped>
.mobile-menu-item {
  @apply h-14 w-full text-14px color-semantic-900 font-500 tracking-wide;
}
</style>
