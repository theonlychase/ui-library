<script setup lang="ts">
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
    <template v-if="options.length">
      <option
        v-for="option in options"
        :key="option"
        v-bind="{ selected: option === value }"
      >
        {{ option }}
      </option>
    </template>
  </select>
</template>
