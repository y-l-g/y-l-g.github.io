<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import { useColorMode } from '@vueuse/core'
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
    <div>

        <div class="mb-5">
            <button @click="mode = mode === 'dark' ? 'light' : 'dark'">
                <UButton v-if="mode === 'dark'" icon="uil-sun" color="neutral" variant="ghost" size="lg" />
                <UButton v-else icon="uil-moon" color="neutral" variant="ghost" size="lg" />
            </button>

            <UDropdownMenu :items="items">
                <UButton icon="i-lucide-languages" color="neutral" variant="ghost" />
            </UDropdownMenu>
        </div>

        <div class="mb-5">
            <p><strong>Youenn LE GOUEDEC</strong></p>
            <p>Freelance</p>
            <p>Full Stack</p>
        </div>

        <img src="/img/photo.jpg" alt="Picture of Me" class="max-w-40 sm:max-w-50 rounded-full mb-5" />
        <div class="mb-5">
            <p><strong>Stack :</strong></p>
            <ul>
                <li>Backend : Laravel + Filament</li>
                <li>Frontend : Vue + Inertia</li>
                <li>Infrastructure : Docker + FrankenPHP + Caddy Server</li>
                <li>Hosting : Hetzner</li>
            </ul>
        </div>

        <div class="mb-5">
            <p><strong>Projects :</strong></p>
            <ul>
                <li><a href="https://notenn.com">notenn.com</a></li>
            </ul>
        </div>
        <div class="mb-5">
            <p><strong>Contact :</strong></p>
            <ul>
                <li>youenn@legouedec.fr</li>
            </ul>
        </div>
        <a href="https://github.com/y-l-g">
            <UIcon name="uil:github" size="20" />
        </a>
    </div>

</template>