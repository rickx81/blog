<script setup lang="ts">
const { VITE_OWNER } = import.meta.env
</script>

<template>
  <footer class="pt-5em">
    <div class="flex items-center flex-col md:flex-row gap-1em">
      <span class="op-50 text-sm">
        2023-PRESENT © {{ VITE_OWNER }}
      </span>
    </div>
  </footer>
</template>
