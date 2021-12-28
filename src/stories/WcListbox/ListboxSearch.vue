<script setup lang="ts">
  import { ref, watch } from 'vue';
  // import { useStore } from 'vuex';
  // import controls from './controls.js';
  // import { setDefaultControls } from '@/utils/stories';
  //
  // const defaultProps = setDefaultControls(controls, useStore);
  const value = ref('');
  const search = ref('');
  const options = ref([]);
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
          const search = val.toLowerCase();
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
      :input-props="{
        iconLeft: 'search',
        placeholder: 'Search for a name',
      }"
    />
    {{ value }}
  </div>
</template>
