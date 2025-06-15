<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
import type { DropdownMenuItem } from '@nuxt/ui';
import { useColorMode } from '@vueuse/core'
const { locale } = useI18n()
const mode = useColorMode()
const switchLocalePath = useSwitchLocalePath()
const items = ref<DropdownMenuItem[]>([
  [
    {
      label: 'Français',
      to: switchLocalePath('fr'),
    },
    {
      label: 'English',
      to: switchLocalePath('en'),
    },
  ],
])
</script>

<template>
  <UApp :locale="locales[locale]">
    <div class="relative min-h-screen">
      <div class="absolute top-0 right-0 z-50 p-4 flex gap-2">
        <UButton v-if="mode === 'dark'" icon="i-uil-sun" color="neutral" variant="ghost" size="lg"
          @click="mode = 'light'" />
        <UButton v-else icon="i-uil-moon" color="neutral" variant="ghost" size="lg" @click="mode = 'dark'" />

        <UDropdownMenu :items="items" :content="{
          align: 'start',
        }">
          <UButton icon="i-lucide-languages" color="neutral" variant="ghost" size="lg" />
        </UDropdownMenu>
      </div>
      <div class="mx-auto flex flex-col items-center py-20 px-2 pt-16">
        <NuxtPage />
      </div>
    </div>
  </UApp>
</template>