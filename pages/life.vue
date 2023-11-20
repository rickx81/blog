<script setup lang="ts">
import { getIncludedYearPosts } from '@/utils'

const posts = await getIncludedYearPosts('life')
</script>

<template>
  <sub-nav />

  <PostList :posts="posts" />
</template>
