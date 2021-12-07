<script setup lang="ts">
  import { useStore } from 'vuex';
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/helpers.js';
  import { ref } from 'vue';

  const defaultProps = setDefaultControls(controls, useStore);
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
