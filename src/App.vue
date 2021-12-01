<script setup lang="ts">
  import DefaultLayout from '@/layouts';
</script>

<template>
  <router-view v-slot="{ Component }">
    <default-layout>
      <component :is="Component" />
    </default-layout>
  </router-view>
</template>
