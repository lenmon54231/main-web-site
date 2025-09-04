<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

interface menu {
  label: string
}
interface Props {
  title?: string
  menuList?: menu[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '选项',
  menuList: () => [],
})
</script>

<template>
  <div class="top-16 text-center">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="w-full inline-flex justify-center rounded-md bg-black/20 px-4 py-2 text-sm text-white font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          {{ props.title }}
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 divide-y divide-gray-100 focus:outline-none"
        >
          <MenuItem v-for="(item, index) in props.menuList" :key="index" v-slot="{ active }">
            <button
              class="group w-full flex items-center rounded-md px-4 py-2 text-sm" :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
              ]"
            >
              {{ item.label }}
            </button>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
