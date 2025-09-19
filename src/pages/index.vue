<script setup lang="ts">
import { nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue' // swiper 所需组件
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { EffectCoverflow } from 'swiper/modules'
import homeBCImage from '~/assets/image/home/home_bc.webp'
import { getCurrentEnv } from '~/utils/common'

import opera from '~/assets/image/example/opera.webp'
import Columbia_Pictures from '~/assets/image/example/Columbia_Pictures.webp'
import Phantom from '~/assets/image/example/Phantom.webp'
import work from '~/assets/image/example/work.webp'

const modules = [EffectCoverflow]
const coverflowEffect = {
  rotate: 0,
  stretch: 0,
  depth: 500,
  modifier: 1,
  slideShadows: false,
}

defineOptions({
  name: 'IndexPage',
})

const env = ref('pc')
onMounted(async () => {
  env.value = await getCurrentEnv()
})

const currentMarkingInfo: any = ref({})
const markingList: any = ref([
  {
    name: 'opera',
    subtitle: 'Opera extensions are designed to enhance the browsing experience by adding new features and functionality to the browser. They can range from ad blockers that remove unwanted advertisements to password managers that securely store your login credentials.',
    head_img: opera,
  },
  {
    name: 'Columbia_Pictures',
    subtitle: 'Columbia Pictures was established by Harry Cohn, Jack Cohn, and Joe Brandt, initially focusing on low-budget films before achieving greater success',
    head_img: Columbia_Pictures,
  },
  {
    name: 'Phantom',
    subtitle: ' Traditionally, a phantom refers to a ghost or a spectral figure, an entity that appears to be present but has no physical form.',
    head_img: Phantom,
  },
  {
    name: 'work',
    subtitle: 'A specific use of the term is in the medical context, where a phantom limb refers to the sensation that an amputated limb is still present, a common experience among amputees.',
    head_img: work,
  },
])

const swiperHandler: any = ref({})
function initSwiper(swiper: any) {
  swiperHandler.value = swiper
}
function onSlideChangeEvent() {
  nextTick(() => {
    const currentIndex = swiperHandler.value.realIndex
    currentMarkingInfo.value = markingList.value[currentIndex]
  })
}
</script>

<template>
  <div :class="env === 'pc' ? 'mt--80px mb-80px' : 'mt-0px mb-0px'" class="h-full w-full flex flex-col items-center justify-start">
    <!-- 首屏大图 -->
    <div class="big-home-image-container relative w-full overflow-hidden">
      <img class="h-full w-full object-cover" :src="homeBCImage">
    </div>
    <div class="mt-103px text-44px font-800 lg:text-62px">
      Where the world builds software
    </div>
  </div>
</template>

<style scoped>
.big-home-image-container {
  height: calc(100vh - 56px);
  @apply lg:h-100vh;
}

.marking-info-container {
  @apply hidden;
  @apply lg:w-full lg:h-200px lg:block lg:flex-col-start;
  background: linear-gradient(180deg, rgba(201, 180, 114, 0) 0%, rgba(0, 214, 253, 0.5) 100%);
}
</style>
