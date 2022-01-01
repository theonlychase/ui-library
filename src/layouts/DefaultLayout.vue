<script setup lang="ts">
  import { provide, reactive } from 'vue';
  import Sidebar from '@/components/layout/Sidebar';
  import Page from '@/components/layout/Page';

  import { PageMeta } from '@/types/global';

  const pageMeta: PageMeta = reactive({
    description: '',
    title: '',
  });

  provide('pageMeta', pageMeta);
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
