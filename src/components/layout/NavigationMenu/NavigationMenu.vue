<script setup lang="ts">
  import { inject } from 'vue';
  import NavigationMenuItem from '@/components/layout/NavigationMenuItem';

  const navItems = inject('nav-items');

  const parentItems = navItems.filter(
    (item) => item.meta.parent && item.children.length,
  );
</script>

<template>
  <div class="flex-shrink-0 flex items-center px-4">
    <wc-icon
      name="templateOutline"
      size="small"
      class="mr-2"
      fill="none"
      stroke="currentColor"
    />
    <h1 class="text-2xl">UI Library</h1>
  </div>
  <div class="mt-5 flex-1 h-0 overflow-y-auto">
    <nav class="px-2 space-y-1 bg-white" aria-label="Sidebar">
      <navigation-menu-item
        v-for="{ name, path, children } in parentItems"
        :key="name"
        :children="children"
        :name="name"
        :path="path"
      />
    </nav>
  </div>
</template>
