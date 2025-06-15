<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col gap-10">
        <div>
            <p><strong>Youenn LE GOUEDEC</strong></p>
            <p>Freelance</p>
            <p>Full Stack</p>
        </div>

        <NuxtImg src="/img/photo.jpg" alt="Picture of Me" class="max-w-40 sm:max-w-50 rounded-full" />
        <div>
            <p><strong>Stack :</strong></p>
            <ul>
                <li>Backend : Laravel + Filament</li>
                <li>Frontend : Vue + Inertia</li>
                <li>Infrastructure : Docker + FrankenPHP + Caddy</li>
                <li>Hosting : Hetzner</li>

            </ul>
        </div>

        <div>
            <p><strong>About me :</strong></p>
            <ul>
                <li>Location : Britanny, France</li>
                <li>Pronouns : He / Him</li>
                <li>Hobbies : Dancing / African Drums & Accordion / Gardenning </li>
            </ul>
        </div>
        <div>
            <p><strong>Projects :</strong></p>
            <ul>
                <li><a href="https://notenn.com">notenn.com</a></li>
            </ul>
        </div>
        <div>
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