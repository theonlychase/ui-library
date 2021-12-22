<script setup lang="ts">
  import { useStore } from 'vuex';
  import controls from './controls';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls(controls, useStore);
</script>

<template>
  <wc-icon v-bind="defaultProps" />
</template>
