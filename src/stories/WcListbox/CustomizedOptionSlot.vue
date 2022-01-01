<script setup lang="ts">
  import { ref } from 'vue';
  import controls from './controls';
  import { setDefaultControls } from '@/utils/stories';

  const value = ref('');

  const defaultProps = setDefaultControls({
    controls,
    title: 'Custom Listbox Options',
  });
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
  <wc-listbox
    v-model:value="value"
    v-bind="{ ...defaultProps, value }"
    :options="options"
    class="mb-6"
    >å
    <template #option="{ active, option }">
      <div class="flex items-center">
        <span class="mr-2">
          <wc-icon
            name="mail"
            :color="active ? 'white' : 'gray400'"
            size="xSmall"
          />
        </span>

        <span class="truncate flex-1">
          {{ option }}
        </span>

        <wc-icon
          v-if="active"
          name="check"
          :color="active ? 'white' : 'gray400'"
          size="xSmall"
        />
      </div>
    </template>
  </wc-listbox>
</template>
