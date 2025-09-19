<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js'

const threeContainer = ref<HTMLDivElement>()

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls

onMounted(() => {
  if (!threeContainer.value)
    return

  /* 1. 场景 & 相机 */
  scene = new THREE.Scene()
  //   scene.background = new THREE.Color(0xF5F5F5)
  camera = new THREE.PerspectiveCamera(
    45,
    threeContainer.value.clientWidth / threeContainer.value.clientHeight,
    0.1,
    1000,
  )
  camera.position.set(0, 0.8, 0.8)

  /* 2. 渲染器 */
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  threeContainer.value.appendChild(renderer.domElement)

  /* 3. 控制器 */
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.autoRotate = true // ✅ 开启自动旋转
  controls.autoRotateSpeed = 1.0

  /* 5. 加载模型（公开 glb） */
  const loader = new GLTFLoader()
  loader.load(
    'https://limengtupian.oss-cn-beijing.aliyuncs.com/a-model/rolex.glb',
    (gltf) => {
      scene.add(gltf.scene)
    },
    undefined,
    err => console.error(err),
  )

  /* ******  HDR 环境光  ****** */
  const hdrLoader = new HDRLoader()
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  hdrLoader.load(
    'https://limengtupian.oss-cn-beijing.aliyuncs.com/a-hdr/golden_gate_hills_1k.hdr',
    (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture
      scene.environment = envMap // 给所有 PBR 材质提供环境反射
      //   scene.background = envMap // 也可当背景
      scene.background = new THREE.Color(0xF5F5F5)
      texture.dispose()
      pmremGenerator.dispose()
    },
    undefined,
    err => console.error('HDR 加载失败', err),
  )

  /* 6. 统一动画循环（Three 推荐写法） */
  renderer.setAnimationLoop(() => {
    controls.update()
    renderer.render(scene, camera)
  })

  /* 7. 响应式 */
  const handleResize = () => {
    if (!threeContainer.value)
      return
    camera.aspect = threeContainer.value.clientWidth / threeContainer.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight)
  }
  window.addEventListener('resize', handleResize)

  /* 清理函数 */
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    renderer.setAnimationLoop(null) // 先停循环
    controls.dispose()
    scene.traverse((obj: any) => {
      if (obj.geometry)
        obj.geometry.dispose()
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach((m: any) => {
          if (m.map)
            m.map.dispose()
          m.dispose()
        })
      }
    })
    renderer.dispose()
  })
})
</script>

<template>
  <div ref="threeContainer" class="w-full flex-1" />
</template>

<style scoped>

</style>
