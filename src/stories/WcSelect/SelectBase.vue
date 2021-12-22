<script setup lang="ts">
  import { useStore } from 'vuex';
  import controls from './controls';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls(controls, useStore);
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
</script>

<template>
  <wc-select v-bind="defaultProps" :options="options" />
</template>
