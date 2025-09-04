<script setup>
import logoImage from '~/assets/image/header_logo.png'

const emits = defineEmits(['showMenuList'])

function showMenuList() {
  emits('showMenuList')
}
</script>

<template>
  <img
    class="mt-8px w-100px sm:mt-0px sm:max-w-216px"
    :src="logoImage"
    object-cover
  >
  <div i-carbon:list text-2xl @click="showMenuList" />
</template>

<style scoped>

</style>
