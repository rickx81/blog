<script setup lang="ts">
import { getIncludedYearPosts } from '@/utils'

const posts = await getIncludedYearPosts('blog')
</script>

<template>
  <SubNav />

  <PostList :posts="posts" />
</template>
