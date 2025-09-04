<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer class="footer-container">
    <div mb-1 text-center>
      {{ t('footer.copyright') }}
    </div>
    <div class="record-container">
      <div md:mx-5>
        {{ t('footer.record') }}
      </div>
      <div mx-5>
        {{ t('footer.filing') }}
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  @apply py-5 border-lightgrey mt-6 max-w-1200px min-h-56px w-full border-t-1;
  @apply flex-col flex items-center justify-center;
  @apply md:(px-5 )
  @apply lg:(flex-row flex items-center justify-center);
}

.record-container {
  @apply flex flex-col items-center justify-center;
  @apply md:(flex flex-row mx-5);
}
</style>
