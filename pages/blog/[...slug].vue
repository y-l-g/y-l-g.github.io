<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => {
    return queryCollection('content').path(route.path).first()
})
</script>

<template>
    <div>
        <template v-if="post">
            <div class="space-y-8">
                <header>
                    <h1 class="text-3xl font-semibold">{{ post.title }}</h1>
                    <p v-if="post.description" class="mt-2 font-medium">{{ post.description }}</p>
                </header>
                <ContentRenderer :value="post" class="prose max-w-none" />
                <div>
                    <NuxtLink :to="$localePath('/blog')">
                        ← {{ $t('Return to blog') }}
                    </NuxtLink>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="space-y-8">
                <h1 class="text-3xl font-semibold">{{ $t('Post not found') }}</h1>
                <NuxtLink :to="$localePath('/blog')">
                    ← {{ $t('Return to blog') }}
                </NuxtLink>
            </div>
        </template>
    </div>
</template>