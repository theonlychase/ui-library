<script setup lang="ts">
  import { mockOptions } from '@/utils/stories';
  const slides = mockOptions.slice(0, 4);
</script>

<template>
  <wc-slider :slides="mockOptions">
    <template #default="{ slide }">
      <wc-card>
        <template #media>
          <img
            src="https://images.unsplash.com/photo-1511225070737-5af5ac9a690d"
            class="aspect-16/9"
          />
        </template>
        <div class="font-bold">{{ slide.name }}</div>
        <div class="text-sm text-gray-400">{{ slide.id }}</div>
      </wc-card>
    </template>
  </wc-slider>
</template>
