<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import hdr from '~/assets/hdr/moon_1k.hdr'
import bg from '~/assets/bg/homeBg_mid.jpg'
import Voyager_probes_with_the_outer_worlds from '~/assets/bg/Voyager_probes_with_the_outer_worlds.jpg'

import model from '~/assets/model/voyager_nasa.glb'
import model_converted from '~/assets/model/model_converted.glb'
import sceneModel from '~/assets/model/scene.glb'
import rolex from '~/assets/model/rolex.glb'
import rolexv1 from '~/assets/model/rolex-v1.glb'
import voyager_nasa_1 from '~/assets/model/voyager_nasa-v1.glb'

interface ModelViewerProp {
  url?: string
}

const props = withDefaults(defineProps<ModelViewerProp>(), {
  url: voyager_nasa_1,
})

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
  camera = new THREE.PerspectiveCamera(
    45,
    threeContainer.value.clientWidth / threeContainer.value.clientHeight,
    0.01,
    10000,
  )
  camera.position.set(0, 1.1, 0.7)

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
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/') // 指向 public/draco
  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)

  loader.load(
    props.url,
    (gltf) => {
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 1 / maxDim // 缩放到 5 单位大小
      gltf.scene.scale.setScalar(scale)
      gltf.scene.position.sub(center.multiplyScalar(scale))

      scene.add(gltf.scene)
    },
    undefined,
    err => console.error(err),
  )

  /* ******  HDR 环境光  ****** */
  const hdrLoader = new HDRLoader()
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  hdrLoader.load(
    hdr,
    (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture
      scene.environment = envMap // 给所有 PBR 材质提供环境反射
      // scene.background = new THREE.Color(0x3A7CA5)
      texture.dispose()
      pmremGenerator.dispose()
      scene.environmentIntensity = 0.5
    },
    undefined,
    err => console.error('HDR 加载失败', err),
  )

  // 加载背景图片
  const TextureLoader = new THREE.TextureLoader()
  TextureLoader.load(Voyager_probes_with_the_outer_worlds, (tex) => {
    const canvas = renderer.domElement // <canvas>
    const imgAspect = tex.image.width / tex.image.height
    const canvasAspect = canvas.clientWidth / canvas.clientHeight

    if (imgAspect > canvasAspect) {
    // 图更宽 → 裁掉左右
      tex.repeat.x = canvasAspect / imgAspect
      tex.offset.x = (1 - tex.repeat.x) * 0.5
    }
    else {
    // 图更高 → 裁掉上下
      tex.repeat.y = imgAspect / canvasAspect
      tex.offset.y = (1 - tex.repeat.y) * 0.5
    }

    tex.colorSpace = THREE.SRGBColorSpace
    tex.matrix.setUvTransform(0, 0, 1, 1, 0, 0, 0)

    scene.background = tex
  })

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
