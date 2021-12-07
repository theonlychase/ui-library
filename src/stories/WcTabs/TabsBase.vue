<script setup lang="ts">
  import { useStore } from 'vuex';
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/helpers.js';
  import { ref } from 'vue';

  const defaultProps = setDefaultControls(controls, useStore);
  const value = ref('tab-1');

  const tabs = [
    { id: 'tab-1', name: 'Tab 1' },
    { id: 'tab-2', name: 'Tab 2' },
    { id: 'tab-3', name: 'Tab 3' },
    { id: 'tab-4', name: 'Tab 4' },
  ];
</script>

<template>
  <wc-tabs
    v-model:value="value"
    :tabs="tabs"
    v-bind="{ ...defaultProps, value }"
  >
    <template #[value]="{ content }">
      {{ content }}
    </template>
  </wc-tabs>
</template>
