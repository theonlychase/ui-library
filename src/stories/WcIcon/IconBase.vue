<script setup lang="ts">
  import controls from './controls';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls({ controls });
</script>

<template>
  <wc-icon v-bind="defaultProps" fill="white" />
</template>
