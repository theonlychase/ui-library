<script setup lang="ts">
  import WcListboxOptions from './WcListboxOptions.vue';
  import WcListboxOption from './WcListboxOption.vue';
  import WcListboxButton from './WcListboxButton.vue';
  import WcInput from '../WcInput';
  import { getValueName, api } from './composables.js';

  const emit = defineEmits(['update:search', 'update:value']);
  const props = defineProps({
    autocomplete: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
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
    highlightedIndex,
    listbox,
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
        :value="search"
        v-bind="inputProps"
        @update:value="(searchValue) => emit('update:search', searchValue)"
        @keydown="(e) => listboxOpen && onKeyDown(e)"
      />

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
      </wc-listbox-options>
    </div>
  </div>
</template>
