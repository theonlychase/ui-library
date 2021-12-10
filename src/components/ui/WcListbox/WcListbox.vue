<script setup lang="ts">
  import { getValueName, listboxApi } from './composables.js';

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
  } = listboxApi(props, emit);
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

      <transition
        leave-to-class="opacity-0"
        leave-from-class="opacity-100"
        leave-active-class="transition ease-in duration-100"
        appear
      >
        <ul
          v-if="listboxOpen && allOptions.length"
          class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          tabindex="-1"
          role="listbox"
          :aria-labelledby="listboxLabel"
          :aria-activedescendant="`listbox-option-${selectedIndex}`"
        >
          <li
            v-for="(option, optionIndex) in options"
            :id="`listbox-option-${optionIndex}`"
            :key="getValueName(option)"
            class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-4"
            :class="{
              'hover:bg-gray-100': getValueName(option) !== selectedValue,
              'bg-gray-100': optionIndex === highlightedIndex,
              'bg-blue-400 text-white': getValueName(option) === selectedValue,
            }"
            role="option"
            @click="setSelectedValue(option)"
          >
            <span
              class="block truncate"
              :class="{
                'font-semibold': getValueName(option) === selectedValue,
                'font-normal': getValueName(option) !== selectedValue,
              }"
            >
              {{ getValueName(option) }}
            </span>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>
