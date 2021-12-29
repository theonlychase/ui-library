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
    option: {
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
    :id="`listbox-option-${index | 0}`"
    class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-4 truncate"
    :class="
      option
        ? {
            'hover:bg-gray-100': option !== selectedValue,
            'bg-gray-100': index === highlightedIndex,
            'bg-blue-400 text-white': option === selectedValue,
            'font-semibold': option === selectedValue,
            'font-normal': option !== selectedValue,
          }
        : 'font-normal'
    "
    role="option"
  >
    <slot name="option" :active="option === selectedValue">
      {{ option }}
    </slot>
  </li>
</template>
