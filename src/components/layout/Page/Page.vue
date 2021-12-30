<script setup lang="ts">
  import { provide, reactive } from 'vue';
  import ControlsPanel from '@/components/layout/ControlsPanel';
  import { PageMeta } from '@/types/global';

  const pageMeta: PageMeta = reactive({
    title: '',
    description: '',
  });

  provide('pageMeta', pageMeta);
</script>

<template>
  <main class="md:pl-64 flex-1 flex flex-col">
    <div class="p-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">
        {{ pageMeta.title || $route.name }}
      </h1>
      <div v-if="pageMeta.description" class="text-sm text-gray-400">
        {{ pageMeta.description }}
      </div>
    </div>
    <div class="px-4 sm:px-6 md:px-8">
      <div class="py-4">
        <slot name="page" />
        <slot name="story" />
      </div>
    </div>
    <controls-panel v-if="!$route.meta.static" />
  </main>
</template>
