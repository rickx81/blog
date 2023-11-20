<script setup lang="ts">
import { subNavLinks } from '@/site.config'

const route = useRoute()

const { path } = route

const router = useRouter()
</script>

<template>
  <ul class="sub-nav flex gap-1em mb-2em">
    <li
      v-for="(item) in subNavLinks" :key="item.path"
      class="cursor-pointer "
      :class="path === item.path ? 'text-deep font-bold' : 'deep-hover'"
      @click="router.push(item.path)"
    >
      <span class="text-xl sm:text-3xl"> {{ item.title }}</span>
    </li>
  </ul>
</template>
