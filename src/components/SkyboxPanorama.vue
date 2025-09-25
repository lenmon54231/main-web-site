<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/* ---------- 状态 ---------- */
const container = ref<HTMLDivElement>()
const loading = ref(true)
const error = ref('')
const autoRotate = ref(true)

/* ---------- Three.js 对象 ---------- */
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let rafId = 0

/* ---------- 天空盒 ---------- */
function createSkybox(): void {
  const loader = new THREE.CubeTextureLoader()
  const urlPrefix = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/cube/Bridge2/'

  const texture = loader.load(
    [
      `${urlPrefix}posx.jpg`,
      `${urlPrefix}negx.jpg`,
      `${urlPrefix}posy.jpg`,
      `${urlPrefix}negy.jpg`,
      `${urlPrefix}posz.jpg`,
      `${urlPrefix}negz.jpg`,
    ],
    undefined,
    undefined,
    () => {
      error.value = '天空盒图片加载失败'
      loading.value = false
    },
  )

  scene.background = texture
  loading.value = false
}

/* ---------- 初始化 Three ---------- */
function init(): void {
  if (!container.value)
    return

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 0.1)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(devicePixelRatio)
  container.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enablePan = false
  controls.minDistance = 1
  controls.maxDistance = 100
  controls.autoRotate = autoRotate.value
  controls.autoRotateSpeed = 0.5

  createSkybox()
  animate()
}

/* ---------- 动画循环 ---------- */
function animate(): void {
  rafId = requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

/* ---------- 控制 ---------- */
function toggleAutoRotate(): void {
  autoRotate.value = !autoRotate.value
  controls.autoRotate = autoRotate.value
}
function resetCamera(): void {
  camera.position.set(0, 0, 0.1)
  controls.reset()
}

/* ---------- 响应式 ---------- */
function onResize(): void {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

/* ---------- 生命周期 ---------- */
onMounted(() => {
  init()
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  cancelAnimationFrame(rafId)
  renderer?.dispose()
  controls?.dispose()
})
</script>

<template>
  <!-- 全屏容器 -->
  <div class="fixed inset-0 h-full w-full from-slate-900 via-slate-800 to-slate-900 bg-gradient-to-br">
    <!-- 信息面板 -->
    <div
      class="absolute left-4 top-4 z-20 rounded-xl bg-white/10 px-4 py-3 text-sm shadow-lg backdrop-blur-md"
    >
      <p>🌐 Three.js Skybox 全景图</p>
      <p>📍 鼠标拖动查看 · 🖱️ 滚轮缩放</p>
    </div>

    <!-- 控制栏 -->
    <div
      class="absolute bottom-4 left-4 z-20 flex gap-2 rounded-xl bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md"
    >
      <button
        class="rounded-lg bg-white/10 px-3 py-1.5 transition hover:bg-white/20"
        @click="toggleAutoRotate"
      >
        {{ autoRotate ? '⏸️ 停止旋转' : '▶️ 自动旋转' }}
      </button>
      <button
        class="rounded-lg bg-white/10 px-3 py-1.5 transition hover:bg-white/20"
        @click="resetCamera"
      >
        🔄 重置视角
      </button>
    </div>

    <!-- Three.js 画布挂载点 -->
    <div ref="container" class="h-full w-full" />

    <!-- 加载 -->
    <div v-if="loading" class="absolute inset-0 grid place-content-center">
      <div class="flex items-center gap-3 rounded-xl bg-white/10 px-6 py-4 backdrop-blur-md">
        <span class="i-carbon-circle-dash animate-spin text-2xl" />
        <span>正在加载天空盒...</span>
      </div>
    </div>

    <!-- 错误 -->
    <div v-if="error" class="absolute inset-0 grid place-content-center">
      <div class="max-w-sm border border-red-500/40 rounded-xl bg-red-500/20 px-6 py-4 text-center">
        <p class="text-red-200">
          ❌ {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
