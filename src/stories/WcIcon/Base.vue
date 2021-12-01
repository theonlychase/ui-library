<script setup lang="ts">
  import { useStore } from 'vuex';
  import controls from './controls';

  const store = useStore();
  store.dispatch('controls/setControls', controls);

  const args = {
    name: 'templateOutline',
  };
</script>

<template>
  <wc-icon v-bind="args" />
</template>
