<script setup lang="ts">
  import DefaultLayout from '@/layouts';
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <default-layout>
      <template v-if="route.meta.static" #page>
        <component :is="Component" />
      </template>

      <template v-else #story>
        <component :is="Component" />
      </template>
    </default-layout>
  </router-view>
</template>
