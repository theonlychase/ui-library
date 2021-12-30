<script setup lang="ts">
  import { ref } from 'vue';
  import controls from './controls';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls({
    controls,
    title: 'Default Loading Bar',
  });
  const loading = ref(false);
</script>

<template>
  <wc-loading-bar v-model:loading="loading" />
</template>
