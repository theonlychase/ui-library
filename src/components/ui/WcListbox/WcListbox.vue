<script setup lang="ts">
  import WcListboxOptions from './WcListboxOptions.vue';
  import WcListboxOption from './WcListboxOption.vue';
  import { getValueName, api } from './composables.js';

  const emit = defineEmits(['update:value']);
  const props = defineProps({
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconRight: {
      type: String,
      default: 'selector',
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Object],
      default: null,
    },
  });

  const {
    allOptions,
    highlightedIndex,
    listbox,
    listboxLabel,
    listboxOpen,
    onKeyDown,
    selectedIndex,
    selectedValue,
    setSelectedValue,
  } = api(props, emit);
</script>

<template>
  <div class="WcListbox">
    <label
      v-if="label"
      :id="listboxLabel"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <div ref="listbox" class="mt-1 relative">
      <button
        type="button"
        class="relative w-full bg-white border border-gray-300 hover:border-gray-400 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
        aria-haspopup="listbox"
        aria-expanded="true"
        :aria-labelledby="listboxLabel"
        @click="listboxOpen = !listboxOpen"
        @keydown="onKeyDown"
      >
        <span
          v-if="$slots['icon-left']"
          class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
        >
          <slot name="icon-left" />
        </span>

        <span
          class="block truncate"
          :class="{
            'pl-6': $slots['icon-left'],
            'text-gray-500': !value,
          }"
        >
          {{ selectedValue }}
        </span>

        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <wc-icon :name="iconRight" color="gray400" size="xSmall" />
        </span>
      </button>

      <wc-listbox-options
        :highlighted-index="highlightedIndex"
        :listbox-open="listboxOpen"
        :listbox-label="listboxLabel"
        :options="allOptions"
        :selected-index="selectedIndex"
      >
        <template #default="{ option, index }">
          <wc-listbox-option
            :highlighted-index="highlightedIndex"
            :index="index"
            :selected-value="selectedValue"
            :value="getValueName(option)"
            @click="setSelectedValue(option)"
          />
        </template>
      </wc-listbox-options>
    </div>
  </div>
</template>
