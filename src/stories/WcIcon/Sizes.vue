<script setup lang="ts">
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';

  setDefaultControls({ controls, title: 'Icon Sizes', disabled: true });

  const sizes = ['xxSmall', 'xSmall', 'small', 'medium', 'large', 'xLarge'];
  const name = 'templateOutline';
</script>

<template>
  <div class="space-y-4">
    <div v-for="size in sizes" :key="size" class="flex items-center space-x-3">
      <wc-icon :size="size" :name="name" />
      <div class="text-xl">{{ size }}</div>
    </div>
  </div>
</template>
