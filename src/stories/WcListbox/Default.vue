<script setup lang="ts">
  import { ref } from 'vue';
  import controls from './controls';
  import { setDefaultControls } from '@/utils/stories';
  import { mockOptions } from '@/utils/stories';
  const value = ref('');

  const defaultProps = setDefaultControls({
    controls,
    title: 'Default Listbox',
  });
</script>

<template>
  <wc-listbox
    v-model:value="value"
    v-bind="{ ...defaultProps, value }"
    :options="mockOptions"
  />
</template>
