<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import controls from './controls';
  import { setDefaultControls } from '@/utils/helpers.js';

  const value = ref('');

  const defaultProps = setDefaultControls(controls, useStore);
  const options = [
    'Option 1',
    { name: 'Option 2', id: 'option-2' },
    'Option 3',
    'Option 4',
  ];
</script>

<template>
  <wc-listbox v-model:value="value" v-bind="defaultProps" :options="options">
    <template v-if="$route.query.iconLeft === 'true'" #icon-left>
      <wc-icon name="check" color="gray400" size="xSmall" />
    </template>
  </wc-listbox>
</template>
