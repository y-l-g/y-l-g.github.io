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
    <div>
        <h1>Blog</h1>
        <ul v-if="posts && posts.length > 0">
            <li v-for="post in posts" :key="post.id">
                <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
                <p>{{ new Date(post.date).toLocaleDateString(locale) }}</p>
            </li>
        </ul>
    </div>
</template>