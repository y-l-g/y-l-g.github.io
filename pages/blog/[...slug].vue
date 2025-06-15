<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => {
    return queryCollection('content').path(route.path).first()
})
</script>

<template>
    <div>
        <template v-if="post">
            <article>
                <header class="mb-8">
                    <h1 class="text-4xl font-bold">{{ post.title }}</h1>
                    <p v-if="post.description" class="text-gray-600 mt-2">{{ post.description }}</p>
                </header>

                <ContentRenderer :value="post" class="prose max-w-none" />

                <div class="mt-8">
                    <NuxtLink :to="$localePath('/blog')" class="text-blue-600 hover:underline">
                        ← Retour au blog
                    </NuxtLink>
                </div>
            </article>
        </template>

        <template v-else>
            <div class="empty-page text-center py-20">
                <h1 class="text-4xl font-bold mb-4">Post non trouvé</h1>
                <NuxtLink :to="$localePath('/blog')" class="text-blue-600 hover:underline">
                    ← Retour au blog
                </NuxtLink>
            </div>
        </template>
    </div>
</template>