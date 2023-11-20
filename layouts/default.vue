<script lang="ts" setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <main class="flex-1 px-7 py-10 w-100%">
    <div class="max-w-70ch m-auto">
      <slot />
      <Footer />
    </div>
  </main>
</template>
