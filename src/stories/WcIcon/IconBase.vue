<script setup lang="ts">
  import { useStore } from 'vuex';
  import controls from './controls.js';

  const store = useStore();
  store.dispatch('controls/setControls', controls);

  const defaultProps = {};

  Object.entries(controls).forEach(([key, value]) => {
    defaultProps[`${key}`] = value.props.value;
  });
</script>

<template>
  <wc-icon v-bind="{ ...defaultProps }" />
</template>
