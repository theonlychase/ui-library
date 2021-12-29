<script setup lang="ts">
  import { ref } from 'vue';
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls({ controls, title: 'Default Menu' });
  const value = ref(false);
</script>

<template>
  <wc-menu v-model:value="value" v-bind="defaultProps">
    <template #activator>
      <wc-button>{{ value ? 'Close' : 'Open' }}</wc-button>
    </template>
    <div class="p-4">Menu Content</div>
  </wc-menu>
</template>
