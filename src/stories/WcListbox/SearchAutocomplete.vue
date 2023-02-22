<script setup lang="ts">
  import { ref, watch } from 'vue';
  import controls from './controls.js';
  import { InputValueProps } from '@/types/global';
  import { setDefaultControls } from '@/utils/stories';
  import { mockOptions } from '@/utils/stories';

  const defaultProps = setDefaultControls({
    controls,
    disabled: true,
    title: 'Listbox Autocomplete',
    description:
      'Combines WcInput & WcListbox for a fully functional Autocomplete',
  });
  const value = ref('');
  const search = ref('');
  const options = ref<InputValueProps[]>([]);

  watch(
    () => search.value,
    (val) => {
      if (val) {
        options.value = mockOptions.filter((v) => {
          const name = v.name.toLowerCase();
          const search = val.toLowerCase().trim();
          return name.includes(search);
        });
      } else {
        options.value = [];
      }
    },
  );
</script>

<template>
  <div>
    <wc-listbox
      v-model:value="value"
      v-model:search="search"
      placeholder="Search for a name"
      v-bind="{
        ...defaultProps,
        options,
        autocomplete: true,
        inputProps: { iconLeft: 'search' },
        search,
        value,
      }"
    >
      <template #no-results>
        <div class="flex items-center">
          <span class="mr-2">
            <wc-icon name="exclamationCircle" class="text-yellow-500" size="xSmall" />
          </span>

          <span class="truncate flex-1"> Custom No Results Message... </span>
        </div>
      </template>
    </wc-listbox>

    <div class="text-sm mt-6">Selected Option: {{ value }}</div>
  </div>
</template>
