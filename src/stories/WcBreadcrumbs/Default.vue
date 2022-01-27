<script setup lang="ts">
  import controls from './controls';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls({
    controls,
    title: 'Default Breadcrumbs',
  });
  const items = [
    { text: 'Home', href: '/', disabled: false },
    { text: 'About', href: '/about', disabled: false },
    { text: 'Careers', href: '/careers', disabled: true },
  ];
</script>

<template>
  <wc-breadcrumbs v-bind="defaultProps" :items="items" />
</template>
