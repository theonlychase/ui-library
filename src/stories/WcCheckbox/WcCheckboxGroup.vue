<script setup lang="ts">
  import WcFieldset from '@/components/ui/WcForm/WcFieldset.vue';
  import { mockOptions } from '@/utils/stories';
  import { ref } from 'vue';
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls({
    controls,
    title: 'Multiple Checkboxes',
    description: 'Wrapped in WcFieldset for proper attrs & accessibility',
    disabled: true,
  });
  const checked = ref([]);
</script>

<template>
  <div>
    <wc-fieldset :options="mockOptions">
      <template #default="{ option }">
        <wc-checkbox v-model:value="checked" :option="option" />
      </template>
    </wc-fieldset>
    <div class="mt-12">Checked: {{ checked }}</div>
  </div>
</template>
