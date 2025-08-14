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
        <!-- <div>
            <p><strong>{{ $t('How it works') }}</strong></p>
            <p>1. {{ $t('You email me with your needs, ideas, or project details') }}</p>
            <p>2. {{ $t('I’ll get back to you to discuss your requirements') }}</p>
            <p>3. {{ $t('Work begins at no cost – I start developing your solution') }}</p>
            <p>4. {{ $t('Only pay when satisfied – We agree on project pricing together') }}</p>
        </div> -->
        <div>
            <p><strong>{{ $t('Contact') }}</strong></p>
            <ul>
                <li>youenn@legouedec.fr</li>
            </ul>
        </div>

        <a href="https://github.com/y-l-g">
            <UIcon name="uil:github" size="20" />
        </a>
    </div>
</template>