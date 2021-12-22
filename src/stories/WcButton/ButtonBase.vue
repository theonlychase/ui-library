<script setup lang="ts">
  import { useStore } from 'vuex';
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls(controls, useStore);
</script>

<template>
  <wc-button v-bind="defaultProps"> Button </wc-button>
</template>
