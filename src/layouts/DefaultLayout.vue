<script setup lang="ts">
  import Sidebar from '@/components/layout/Sidebar';
  import Page from '@/components/layout/Page';
</script>

<template>
  <sidebar />
  <page>
    <template #page>
      <slot name="page" />
    </template>

    <template #story>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </template>
  </page>
</template>
