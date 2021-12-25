<script setup lang="ts">
  import { selectApi, getValueId, getValueName } from './composables.js';

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: [String, Number],
      default: null,
    },
    value: {
      type: String,
      default: '',
    },
  });
  const emit = defineEmits(['update:value']);
  const { allOptions } = selectApi(props);
</script>

<template>
  <label
    v-if="label"
    :for="label"
    class="block text-sm font-medium text-gray-700"
  >
    {{ label }}
  </label>
  <select
    :id="label || id"
    :disabled="disabled"
    :name="name || label"
    class="form-select mt-1 block w-full min-w-max pl-3 pr-10 py-2 text-gray-900 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transition-colors"
    :class="{
      'bg-gray-50': disabled,
      'text-gray-500': placeholder && !value,
    }"
    :value="value"
    @input="({ target }) => $emit('update:value', target.value)"
  >
    <template v-if="allOptions.length">
      <option v-if="placeholder" hidden disabled selected>
        {{ placeholder }}
      </option>
      <option
        v-for="option in allOptions"
        :key="getValueId(option)"
        :value="getValueName(option)"
      >
        {{ getValueName(option) }}
      </option>
    </template>
  </select>
</template>

<style>
  select.form-select {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 fill-current text-gray-400' viewBox='0 0 20 20'%3e%3cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3e%3c/svg%3e");
    background-position: right 0.65rem center;
  }
</style>
