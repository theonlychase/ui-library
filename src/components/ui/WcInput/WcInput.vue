<script setup lang="ts">
  const props = defineProps({
    iconLeft: {
      type: String,
      default: '',
    },
    iconRight: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: [String, Number],
      default: null,
    },
    type: {
      type: String,
      default: 'text',
      validator: (val) => {
        return val.match(/text|checkbox|radio|password|number|email|color/);
      },
    },
    value: {
      type: String,
      default: '',
    },
    variation: {
      type: String,
      default: 'solid',
    },
  });

  const emit = defineEmits(['update:value']);
</script>

<template>
  <label
    v-if="label && variation !== 'labelOverlap' && variation !== 'labelInset'"
    :for="type"
    class="block text-sm font-medium text-gray-700"
    :class="{
      'ml-px pl-4': variation === 'pill',
    }"
  >
    {{ label }}
  </label>
  <div
    :class="{
      '!rounded-full': variation === 'pill',
      'bg-gray-50 border-b-2 shadow-none rounded-none transition-colors':
        variation === 'underline',
      'shadow-sm border focus-within:ring-1 focus-within:ring-blue-500 transition-shadow':
        variation !== 'underline',
    }"
    class="mt-1 relative rounded-md px-3 py-2 border-gray-300 bg-white focus-within:border-blue-500"
  >
    <div
      v-if="iconLeft && variation !== 'labelInset'"
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
    >
      <wc-icon
        :name="iconLeft"
        size="xSmall"
        color="gray400"
        view-box="0 0 20 20"
      />
    </div>
    <label
      v-if="
        label && (variation === 'labelOverlap' || variation === 'labelInset')
      "
      :for="type"
      :class="{
        block: variation === 'labelInset',
        'absolute -top-2 left-2 -mt-px inline-block px-1':
          variation === 'labelOverlap',
      }"
      class="bg-white text-xs font-medium text-gray-900"
      >{{ label }}</label
    >
    <input
      :id="type"
      :type="type"
      :name="type"
      :class="{
        'bg-gray-50': variation === 'underline',
        '!pl-8': iconLeft && variation !== 'labelInset',
      }"
      class="form-input block w-full rounded-md sm:text-sm border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0"
      :placeholder="placeholder"
      :value="value"
      @input="({ target }) => $emit('update:value', target.value)"
    />
    <div
      v-if="iconRight"
      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
    >
      <wc-icon
        :name="iconRight"
        size="xSmall"
        color="gray400"
        view-box="0 0 20 20"
      />
    </div>
  </div>
</template>
