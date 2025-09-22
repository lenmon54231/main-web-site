<script setup>
import logoImage from '~/assets/image/header_logo.png'

const emits = defineEmits(['showMenuList'])

function showMenuList() {
  emits('showMenuList')
}
</script>

<template>
  <div class="mx-25px w-full flex-row-between lg:hidden">
    <img
      class="mt-8px w-100px sm:mt-0px sm:max-w-216px"
      :src="logoImage"
      object-cover
    >
    <div i-carbon:list text-2xl @click="showMenuList" />
  </div>
</template>

<style scoped>

</style>
