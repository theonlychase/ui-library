<script setup lang="ts">
  import WcListboxOptions from './WcListboxOptions.vue';
  import WcListboxOption from './WcListboxOption.vue';
  import WcListboxButton from './WcListboxButton.vue';
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
      <wc-listbox-button
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
