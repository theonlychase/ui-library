<script setup lang="ts">
  import WcListboxOptions from './WcListboxOptions.vue';
  import WcListboxOption from './WcListboxOption.vue';
  import WcListboxButton from './WcListboxButton.vue';
  import WcInput from '../WcInput';
  import WcLoadingBar from '../WcLoadingBar';
  import { getValueName } from '@/utils/helpers';
  import {
    api,
    onMousedown,
    onMouseup,
    setInternalSearch,
  } from './composables.js';

  const emit = defineEmits(['update:search', 'update:value']);
  const props = defineProps({
    autocomplete: {
      type: Boolean,
      default: false,
    },
    debounce: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    noResults: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: null,
    },
    inputProps: {
      type: Object,
      default: null,
    },
    search: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Object],
      default: null,
    },
  });

  const {
    allOptions,
    focused,
    highlightedIndex,
    isLoading,
    listbox,
    listboxOpen,
    onFocus,
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
      :id="label"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <div ref="listbox" class="mt-1 relative">
      <wc-listbox-button
        v-if="!autocomplete"
        :disabled="disabled"
        :selected-value="selectedValue"
        @click="listboxOpen = !listboxOpen"
        @keydown="onKeyDown"
      >
        <template v-if="$slots['icon-left']" #icon-left>
          <slot name="icon-left" />
        </template>

        <template #icon-right>
          <slot name="icon-right" />
        </template>
      </wc-listbox-button>

      <wc-input
        v-if="autocomplete"
        v-bind="{
          ...inputProps,
          disabled,
          focus: focused,
          placeholder,
        }"
        :value="search"
        @update:value="(searchValue) => setInternalSearch(emit, searchValue)"
        @keydown="(e) => listboxOpen && onKeyDown(e)"
        @focus="() => onFocus(search, allOptions)"
      />
      <wc-loading-bar v-if="autocomplete" :loading="isLoading" />

      <wc-listbox-options
        :highlighted-index="highlightedIndex"
        :listbox-open="listboxOpen"
        :listbox-label="label"
        :options="allOptions"
        :selected-index="selectedIndex"
      >
        <template #default="{ option, index }">
          <wc-listbox-option
            :highlighted-index="highlightedIndex"
            :index="index"
            :selected-value="selectedValue"
            :option="getValueName(option)"
            @click="setSelectedValue(option)"
            @mousedown="autocomplete && onMousedown()"
            @mouseup="autocomplete && onMouseup()"
          >
            <template #option="{ active }">
              <slot
                name="option"
                :option="getValueName(option)"
                :active="active"
              />
            </template>
          </wc-listbox-option>
        </template>

        <template v-if="autocomplete && noResults" #no-results>
          <wc-listbox-option>
            <template #option>
              <slot name="no-results">
                No Results. Please refine your search.
              </slot>
            </template>
          </wc-listbox-option>
        </template>
      </wc-listbox-options>
    </div>
  </div>
</template>
