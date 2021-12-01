<script setup lang="ts">
  import Sidebar from '@/components/layout/Sidebar';
  import Page from '@/components/layout/Page';
</script>

<template>
  <sidebar />
  <page>
    <slot />
  </page>
</template>
