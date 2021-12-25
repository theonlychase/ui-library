<script setup lang="ts">
  import WcIcon from '../WcIcon';
  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false,
    },
    listboxLabel: {
      type: String,
      default: 'selector',
    },
    selectedValue: {
      type: [String, Object],
      default: null,
    },
  });
</script>

<template>
  <button
    type="button"
    class="relative w-full bg-white border border-gray-300 hover:border-gray-400 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
    :class="{
      'bg-gray-50 pointer-events-none': disabled,
    }"
    aria-haspopup="listbox"
    aria-expanded="true"
    :aria-labelledby="listboxLabel"
  >
    <span
      v-if="$slots['icon-left']"
      class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
    >
      <slot name="icon-left" />
    </span>

    <span
      class="block truncate min-h-[1.25rem]"
      :class="{
        'pl-6': $slots['icon-left'],
        'text-gray-500': !selectedValue,
      }"
    >
      {{ selectedValue }}
    </span>

    <span
      class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
    >
      <slot name="icon-right">
        <wc-icon name="selector" color="gray400" size="xSmall" />
      </slot>
    </span>
  </button>
</template>
