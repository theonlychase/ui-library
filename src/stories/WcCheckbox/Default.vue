<script setup lang="ts">
  import { ref } from 'vue';
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls({
    controls,
    title: 'Default Checkbox',
    description: 'Single Checkbox',
    disabled: true,
  });
  const checked = ref([]);
  const option = 'Usa';
</script>

<template>
  <div>
    <wc-checkbox v-model:value="checked" :option="option" />
    <div class="mt-12">Checked: {{ checked }}</div>
  </div>
</template>
