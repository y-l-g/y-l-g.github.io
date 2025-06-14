<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
const mode = useColorMode() 
</script>

<template>
    <div>
        <button class="absolute right-10 top-10" @click="mode = mode === 'dark' ? 'light' : 'dark'">
            <UIcon v-if="mode === 'dark'" name="uil:sun" size="20" />
            <UIcon v-else name="uil:moon" size="20" />
        </button>
        <div class="mb-10">
            <p><strong>Youenn LE GOUEDEC</strong></p>
            <p>Freelance</p>
            <p>Full Stack</p>
        </div>
        <img src="/img/photo.jpg" alt="Picture of Me" class="max-w-40 sm:max-w-50 rounded-full mb-10" />
        <div class="mb-10">
            <p><strong>Stack :</strong></p>
            <ul>
                <li>Backend : Laravel + Filament</li>
                <li>Front-End : Vue + Inertia</li>
                <li>Server : Docker + FrankenPHP</li>
                <li>Hosting : Hetzner</li>
            </ul>
        </div>

        <div class="mb-10">
            <p><strong>Projects :</strong></p>
            <ul>
                <li><a href="https://notenn.com">notenn.com</a></li>
            </ul>
        </div>
        <div class="mb-10">
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