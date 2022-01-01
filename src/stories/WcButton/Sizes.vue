<script setup lang="ts">
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';

  setDefaultControls({ controls, title: 'Button Sizes', disabled: true });

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
