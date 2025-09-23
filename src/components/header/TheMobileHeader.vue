<script setup>
import logoImage from '~/assets/image/header_logo.png'

const emits = defineEmits(['showMenuList'])

function showMenuList() {
  emits('showMenuList')
}
</script>

<template>
  <div class="mx-25px w-full flex-row-between lg:hidden">
    <div class="h-full flex-row-start">
      <img
        class="w-36px"
        :src="logoImage"
        object-cover
      >
      <div class="mb-6px ml-12px text-22px font-600">
        Voyager
      </div>
    </div>
    <div i-carbon:list text-2xl @click="showMenuList" />
  </div>
</template>

<style scoped>

</style>
