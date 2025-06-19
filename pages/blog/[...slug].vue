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
                    <p v-if="post.description" class="mt-2 font-medium">{{ post.description }}</p>
                </header>

                <ContentRenderer :value="post" class="prose max-w-none" />

                <div class="mt-8">
                    <NuxtLink :to="$localePath('/blog')">
                        ← {{ $t('Return to blog') }}
                    </NuxtLink>
                </div>
            </article>
        </template>

        <template v-else>
            <div class="empty-page text-center py-20">
                <h1 class="text-4xl font-bold mb-4">{{ $t('Post not found') }}</h1>
                <NuxtLink :to="$localePath('/blog')">
                    ← {{ $t('Return to blog') }}
                </NuxtLink>
            </div>
        </template>
    </div>
</template>