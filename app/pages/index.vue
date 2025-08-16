<script setup lang="ts">
import { NuxtImg } from '#components';


</script>

<template>
    <div class="space-y-8">
        <div>
            <p><strong>Youenn Le Gouedec</strong></p>
            <p>Freelance</p>
            <p>Full Stack</p>
        </div>

        <NuxtImg src="/photo.jpg" alt="Picture of Me" class="max-w-40 sm:max-w-50 rounded-full dark:brightness-80" />
        <div>
            <p><strong>Stack</strong></p>
            <p>Backend : Laravel + Filament</p>
            <p>Frontend : Vue + Inertia</p>
            <p>{{ $t('Environment') }} : Linux + Docker + Caddy</p>
            <p>{{ $t('Hosting') }} : Hetzner</p>
        </div>

        <div>
            <p><strong>{{ $t('About me') }}</strong></p>
            <p>{{ $t('Location : Britanny, France') }} </p>
        </div>
        <div>
            <p><strong>{{ $t('Projects') }}</strong></p>
            <p><a href="https://notenn.com">notenn.com</a></p>
            <p><a href="https://webvite.fr">webvite.fr</a></p>
        </div>
        <div>
            <p><strong>{{ $t('Contact') }}</strong></p>
            <ul>
                <li>youenn@legouedec.fr</li>
            </ul>
        </div>

        <div class="flex gap-2">
            <a href="https://github.com/y-l-g">
                <UIcon name="uil:github" size="20" />
            </a>
            <a href="https://x.com/_y_l_g_">
                <UIcon name="uil:twitter" size="20" />
            </a>
        </div>
    </div>
</template>