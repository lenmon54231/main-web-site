<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'
import { buyTicket, getCurrentEnv, toPanorama } from '~/utils/common'

const { locale } = useI18n()

const headerItemList = ref([
  { id: 'home', name: 'header.home', path: '/', isTrans: true,
  },
  { id: 'introduction', name: 'header.introduction', path: '/introduction' },
  {
    id: 'guide',
    name: 'header.guide',
    path: '/guide',
  },
  {
    id: 'ticket',
    name: 'header.ticket',
    path: '/ticket',
  },
  {
    id: 'logo',
    name: '',
    path: '',
  },
  {
    id: 'panorama',
    name: 'header.panorama',
    path: '/panorama',
  },
  {
    id: 'mall',
    name: 'header.mall',
    path: '/mall',
  },
  {
    id: 'information',
    name: 'header.information',
    path: '/information',
  },
  {
    id: 'language',
    name: 'header.language',
    path: '/language',
  },
])

const env = ref('h5')

onMounted(async () => {
  updateHeadInfo()
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

const headInfo = ref({
  title: '',
  meta: [],
  link: [
    {
      rel: 'icon',
      // href: () => '/favicon.png',
      href: 'data:;base64,=',
    },
  ],
})
useHead(headInfo)

async function toggleLocales() {
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
  updateHeadInfo()
  closeMenuList()
}

function updateHeadInfo() {
  Object.assign(headInfo.value, {
    title: locale.value === 'en' ? 'Official website' : '官方网站',
    meta: [
      {
        name: 'description',
        content: locale.value === 'en' ? 'panorama, AR' : '全景图，AR',
      },
    ],
  })
}

function toPanoramaAndClose() {
  closeMenuList()
  toPanorama()
}

function buyTicketAndClose() {
  closeMenuList()
  buyTicket()
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
      isNavTrans ? 'nav-filter color-semantic-100' : 'bg-purple-to-blue  color-semantic-200',
      env === 'pc' ? 'h-80px' : 'h-54px',
    ]"
    class="nav-full-container fixed z-2 w-full flex-row-center text-16px font-600 tracking-wider shadow"
  >
    <div class="mx-25px w-full flex-row-between lg:hidden">
      <TheMobileHeader @show-menu-list="showMenuList" />
    </div>
    <div class="mx-15px hidden h-full max-w-1300px w-full items-center justify-around lg:flex">
      <ThePcHeader
        :header-item-list="headerItemList"
        @toggle-locales="toggleLocales"
        @to-panorama="toPanoramaAndClose"
        @buy-ticket="buyTicketAndClose"
        @update-is-top="updateIsTop"
        @update-active-header-id="updateActiveHeaderId"
      />
    </div>
  </nav>

  <div :class="env === 'pc' ? 'h-80px' : 'h-54px'" w-full />

  <TheMobileHeaderDrawer
    :is-show-menu-list="isShowMenuList" :header-item-list="headerItemList"
    @toggle-locales="toggleLocales" @close="closeMenuList" @to-panorama="toPanoramaAndClose" @buy-ticket="buyTicketAndClose"
  />
</template>

<style scoped>
.nav-filter {
  backdrop-filter: blur(24px);
}

.nav-full-container {
  border-bottom: 1px solid #ffffff1a;
}

.bg-purple-to-blue {
  background:
    radial-gradient(141.42% 141.42% at 100% 0%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.3)),
    radial-gradient(140.35% 140.35% at 100% 94.74%, rgb(189, 52, 254), rgba(189, 52, 254, 0.6)),
    radial-gradient(89.94% 89.94% at 18.42% 15.79%, rgb(65, 209, 255), rgba(65, 209, 255, 0.8));
  box-shadow: 0 1px rgba(255, 255, 255, 0.149) inset;
}
</style>
