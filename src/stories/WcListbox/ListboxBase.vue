<script setup lang="ts">
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import controls from './controls';
  import { setDefaultControls } from '@/utils/helpers.js';

  const value = ref('');

  const defaultProps = setDefaultControls(controls, useStore);
  const options = [
    'USA',
    { name: 'Mexico', id: 'mexico' },
    'Spain',
    'Brazil',
    'Germany',
    'Turkey',
    'Canada',
  ];
</script>

<template>
  <wc-listbox v-model:value="value" v-bind="defaultProps" :options="options">
    <template v-if="$route.query.iconLeft === 'true'" #icon-left>
      <wc-icon name="check" color="gray400" size="xSmall" />
    </template>
  </wc-listbox>
</template>
