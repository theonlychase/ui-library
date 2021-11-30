<script setup lang="ts">
  import ControlsPanel from '@/components/layout/ControlsPanel';
</script>

<template>
  <main class="md:pl-64 flex-1 flex flex-col">
    <div class="max-w-7xl p-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">{{ $route.name }}</h1>
    </div>
    <div class="max-w-7xl px-4 sm:px-6 md:px-8">
      <div class="py-4">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
    <controls-panel />
  </main>
</template>
