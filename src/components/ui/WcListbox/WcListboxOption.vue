<script setup lang="ts">
  const props = defineProps({
    highlightedIndex: {
      type: Number,
      default: -1,
    },
    index: {
      type: Number,
      default: null,
    },
    value: {
      type: String,
      default: '',
    },
    selectedValue: {
      type: String,
      default: '',
    },
  });
</script>

<template>
  <li
    :id="`listbox-option-${index}`"
    class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-4"
    :class="{
      'hover:bg-gray-100': value !== selectedValue,
      'bg-gray-100': index === highlightedIndex,
      'bg-blue-400 text-white': value === selectedValue,
    }"
    role="option"
  >
    <span
      class="block truncate"
      :class="{
        'font-semibold': value === selectedValue,
        'font-normal': value !== selectedValue,
      }"
    >
      {{ value }}
    </span>
  </li>
</template>
