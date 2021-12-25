<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';

  const value = ref('');

  const defaultProps = setDefaultControls(controls, useStore);
</script>

<template>
  <wc-input v-model:value="value" v-bind="defaultProps" />
</template>
