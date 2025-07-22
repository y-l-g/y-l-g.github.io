<script setup lang="ts">
const { locale } = useI18n()

const { data: posts } = await useAsyncData('blog', () =>
    queryCollection('content')
        .where('path', 'LIKE', `/${locale.value}/blog%`)
        .order('date', 'DESC')
        .all()
)
</script>

<template>
    <div class="space-y-10">
        <h1 class="text-3xl font-medium">Blog</h1>
        <div v-if="posts?.length" class="space-y-8">
            <article v-for="post in posts" :key="post.id" class="border-b border-muted pb-6 last:border-0">
                <NuxtLink :to="post.path">
                    <h2 class="font-medium">
                        {{ post.title }}
                    </h2>
                    <time :datetime="post.date" class="text-sm text-dimmed">
                        {{ new Date(post.date).toLocaleDateString(locale) }}
                    </time>
                </NuxtLink>
            </article>
        </div>
        <p v-else class="text-dimmed dark:text-dimmed-dark">
            Aucun article disponible pour le moment.
        </p>
    </div>

</template>