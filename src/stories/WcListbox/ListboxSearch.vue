<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRouteQuery } from '@vueuse/router';
  import controls from './controls.js';
  import { InputValueProps } from '@/types/global';
  import { setDefaultControls } from '@/utils/stories';
  import { mockOptions } from '@/utils/stories';
  let controlState = { ...controls };
  controlState = {
    ...controlState,
    debounce: {
      ...controlState.debounce,
      type: 'select',
      props: {
        value: '0',
        options: ['0', '500', '1000', '2000'],
      },
    },
  };

  const defaultProps = setDefaultControls({
    controls: controlState,
    title: 'Listbox Autocomplete',
  });
  const value = ref('');
  const search = ref('');
  const options = ref<InputValueProps[]>([]);
  const debounceQuery = useRouteQuery('debounce');
  const searchQuery = useRouteQuery('search');
  const key = ref(0);

  watch(
    () => debounceQuery.value,
    (val) => {
      key.value++;
    },
  );

  watch(
    () => searchQuery.value,
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
      :key="key"
      v-model:value="value"
      v-model:search="searchQuery"
      placeholder="Search for a name"
      v-bind="{
        ...defaultProps,
        debounce: JSON.parse(debounceQuery),
        options,
        autocomplete: true,
        inputProps: { iconLeft: 'search' },
        search: searchQuery,
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
