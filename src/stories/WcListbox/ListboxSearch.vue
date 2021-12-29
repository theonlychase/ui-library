<script setup lang="ts">
  import { ref, Ref, watch } from 'vue';
  import controls from './controls.js';
  import { setDefaultControls } from '@/utils/stories';

  const defaultProps = setDefaultControls({
    controls,
    disabled: true,
    title: 'Listbox Autocomplete',
  });
  const value = ref('');
  const search = ref('');
  const options: Ref<Array<object | string>> = ref([]);
  const api = [
    {
      name: 'Adam',
      id: 'adam',
    },
    {
      name: 'Brian',
      id: 'brian',
    },
    {
      name: 'Chase',
      id: 'chase',
    },
    {
      name: 'David',
      id: 'david',
    },
    {
      name: 'Eric',
      id: 'eric',
    },
    {
      name: 'Frank',
      id: 'frank',
    },
    {
      name: 'Greg',
      id: 'greg',
    },
    {
      name: 'Henry',
      id: 'henry',
    },
    {
      name: 'Jack',
      id: 'jack',
    },
    {
      name: 'Mary',
      id: 'mary',
    },
    {
      name: 'Natasha',
      id: 'natasha',
    },
    {
      name: 'Paul',
      id: 'paul',
    },
    {
      name: 'Roger',
      id: 'roger',
    },
    {
      name: 'Sam',
      id: 'sam',
    },
    {
      name: 'Tim',
      id: 'tim',
    },
  ];

  watch(
    () => search.value,
    (val) => {
      if (val) {
        const found = api.filter((v) => {
          const name = v.name.toLowerCase();
          const search = val.toLowerCase().trim();
          return name.includes(search);
        });
        options.value = [...found];
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
      autocomplete
      :options="options"
      placeholder="Search for a name"
      :input-props="{
        iconLeft: 'search',
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
