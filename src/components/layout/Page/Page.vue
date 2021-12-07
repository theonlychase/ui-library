<script setup lang="ts">
  import ControlsPanel from '@/components/layout/ControlsPanel';
  import Dashboard from '@/pages/Dashboard/Dashboard.vue';
</script>

<template>
  <main class="md:pl-64 flex-1 flex flex-col">
    <div class="p-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">{{ $route.name }}</h1>
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
