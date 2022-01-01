<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useDebounceFn } from '@vueuse/core';
  import controls from './controls.js';
  import { InputValueProps } from '@/types/global';
  import { setDefaultControls } from '@/utils/stories';
  import { mockOptions } from '@/utils/stories';

  const defaultProps = setDefaultControls({
    controls,
    disabled: true,
    title: 'Listbox Autocomplete With Loading Bar',
    description: 'debounce of 1000ms used on every keypress',
  });
  const value = ref('');
  const search = ref('');
  const loading = ref(false);
  const options = ref<InputValueProps[]>([]);
  const debounceSearch = useDebounceFn((val) => {
    options.value = mockOptions.filter((v) => {
      const name = v.name.toLowerCase();
      const search = val.toLowerCase().trim();
      return name.includes(search);
    });
    loading.value = false;
  }, 1000);

  watch(
    () => search.value,
    (val) => {
      if (val) {
        const name = value.value ? value.value.name : '';
        if (name !== val) {
          loading.value = true;
          debounceSearch(val);
        }
      } else {
        options.value = [];
        loading.value = false;
      }
    },
  );
</script>

<template>
  <div>
    <wc-listbox
      v-model:value="value"
      v-model:search="search"
      :loading="loading"
      v-bind="{
        ...defaultProps,
        autocomplete: true,
        inputProps: { iconLeft: 'search' },
        options,
        search,
        value,
      }"
    >
      <template #no-results>
        <div class="flex items-center">
          <span class="mr-2">
            <wc-icon name="exclamationCircle" color="yellow500" size="xSmall" />
          </span>

          <span class="truncate flex-1"> Custom No Results Message... </span>
        </div>
      </template>
    </wc-listbox>

    <div class="text-sm mt-6">Selected Option: {{ value }}</div>
  </div>
</template>
