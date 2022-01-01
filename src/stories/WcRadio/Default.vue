<script setup lang="ts">
  import WcFieldset from '@/components/ui/WcForm/WcFieldset.vue';
  import { mockOptions } from '@/utils/stories';
  import { ref } from 'vue';
  import controls from './controls';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls({
    controls,
    title: 'Default Radio',
    description: 'Wrapped in WcFieldset for proper attrs & accessibility',
    disabled: true,
  });
  const checked = ref({ name: 'Usa', id: 'use' });
</script>

<template>
  <div>
    <wc-fieldset :options="mockOptions">
      <template #default="{ option }">
        <wc-radio v-model:value="checked" :option="option" />
      </template>
    </wc-fieldset>
    <div class="mt-12">Checked: {{ checked }}</div>
  </div>
</template>
