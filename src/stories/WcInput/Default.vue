<script setup lang="ts">
  import { ref } from 'vue';
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';

  const value = ref('');

  const defaultProps = setDefaultControls({ controls, title: 'Default Input' });
</script>

<template>
  <wc-input v-model:value="value" v-bind="defaultProps" />
</template>
