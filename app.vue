<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
</script>


<template>
  <UApp :locale="locales[locale]">
    <div class="mx-auto flex flex-col items-center py-20 px-2">
      <NuxtPage />
    </div>
  </UApp>
</template>