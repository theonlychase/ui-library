<script setup lang="ts">
  const sizes = ['xSmall', 'small', 'medium', 'large'];
</script>

<template>
  <div class="space-y-4">
    <div v-for="size in sizes" :key="size" class="flex items-center space-x-3">
      <wc-button :size="size"> Button </wc-button>
      <div class="text-xl">{{ size }}</div>
    </div>
  </div>
</template>
