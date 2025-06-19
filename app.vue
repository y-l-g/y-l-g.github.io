<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
import type { DropdownMenuItem } from '@nuxt/ui';

const { locale, setLocale } = useI18n()
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})

const items = ref<DropdownMenuItem[]>([
  [
    {
      slot: 'fr' as const
    },
    {
      slot: 'en' as const
    },
  ],
])
</script>

<template>
  <UApp :locale="locales[locale]">
    <div class="relative min-h-screen text-toned">
      <header
        class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20">
        <div class="flex items-center justify-between px-4 py-3">
          <div class="flex gap-2 items-center">
            <NuxtLink :to="$localePath('index')">
              <UButton icon="i-lucide-home" variant="ghost" size="lg" color="neutral" />
            </NuxtLink>
            <NuxtLink :to="$localePath('blog')">
              Blog
            </NuxtLink>
          </div>

          <div class="flex items-center gap-2">
            <UButton :icon="isDark ? 'i-uil-sun' : 'i-uil-moon'" color="neutral" variant="ghost" size="lg"
              @click="isDark = !isDark" />

            <UDropdownMenu :items="items" :content="{ align: 'end' }">
              <UButton icon="i-lucide-languages" color="neutral" variant="ghost" size="lg" />
              <template #fr>
                <UButton label="Français" color="neutral" variant="ghost" @click="setLocale('fr')" />
              </template>
              <template #en>
                <UButton label="English" color="neutral" variant="ghost" @click="setLocale('en')" />
              </template>
            </UDropdownMenu>
          </div>
        </div>
      </header>

      <main class="flex-1 mx-auto px-4 py-16 max-w-4xl">
        <NuxtPage />
      </main>
    </div>
  </UApp>
</template>