<script setup lang="ts">
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';
  import { ref } from 'vue';

  const defaultProps = setDefaultControls({ controls, title: 'Default Tabs' });
  const value = ref('Tab 1');

  const tabs = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'];
</script>

<template>
  <wc-tabs v-model:value="value" :tabs="tabs" v-bind="defaultProps">
    <template #[value]="{ tab }">
      {{ tab }}
    </template>
  </wc-tabs>
</template>
