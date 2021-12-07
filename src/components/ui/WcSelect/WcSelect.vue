<script setup lang="ts">
  import { selectProps } from './composables.js';

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:value']);

  const { allOptions, getValueId, getValueName } = selectProps(props);
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
    :id="label"
    :disabled="disabled"
    :name="label"
    class="form-select mt-1 block w-full min-w-max pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
    :value="value"
    @input="({ target }) => $emit('update:value', target.value)"
  >
    <template v-if="allOptions.length">
      <option
        v-for="option in allOptions"
        :key="getValueId(option)"
        v-bind="{ selected: getValueName(option) === value }"
      >
        {{ getValueName(option) }}
      </option>
    </template>
  </select>
</template>
