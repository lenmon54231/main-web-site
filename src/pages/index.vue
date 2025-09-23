<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div class="relative min-h-100vh w-full flex flex-1 flex-col items-center justify-start bg-blue">
    <SplashCursor
      :SIM_RESOLUTION="128"
      :DYE_RESOLUTION="1440"
      :CAPTURE_RESOLUTION="512"
      :DENSITY_DISSIPATION="3.5"
      :VELOCITY_DISSIPATION="2"
      :PRESSURE="0.1"
      :PRESSURE_ITERATIONS="20"
      :CURL="3"
      :SPLAT_RADIUS="0.2"
      :SPLAT_FORCE="6000"
      :SHADING="true"
      :COLOR_UPDATE_SPEED="10"
      :BACK_COLOR="{ r: 0.5, g: 0, b: 0 }"
      :TRANSPARENT="true"
    />
    <div class="absolute h-full w-full">
      <LightRays
        rays-origin="top-center"
        rays-color="#00ffff"
        :rays-speed="1.5"
        :light-spread="0.8"
        :ray-length="1.2"
        :follow-mouse="true"
        :mouse-influence="0.1"
        :noise-amount="0.1"
        :distortion="0.05"
        class-name="custom-rays"
      />
    </div>
    <div class="absolute h-full w-full flex-col-center">
      <div class="mt-103px text-44px color-amber font-800 brightness-100 lg:text-62px hover:brightness-270">
        Where the world builds software
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
