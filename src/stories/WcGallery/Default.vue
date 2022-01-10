<script setup lang="ts">
  import { mockImages } from '@/utils/stories';
  // import controls from './controls';
  // import { setDefaultControls } from '@/utils/stories';
  //
  // const defaultProps = setDefaultControls({ controls, title: 'Default Card' });
</script>

<template>
  <wc-gallery :images="mockImages" pagination />
</template>
