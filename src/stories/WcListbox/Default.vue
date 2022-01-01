<script setup lang="ts">
  import { ref } from 'vue';
  import controls from './controls';
  import { setDefaultControls } from '@/utils/stories';
  const value = ref('');

  const defaultProps = setDefaultControls({
    controls,
    title: 'Default Listbox',
  });
  const options = [
    'USA',
    { name: 'Mexico', id: 'mexico' },
    'Spain',
    'Brazil',
    'Germany',
    'Turkey',
    'Canada',
  ];
</script>

<template>
  <wc-listbox
    v-model:value="value"
    v-bind="{ ...defaultProps, value }"
    :options="options"
  />
</template>
