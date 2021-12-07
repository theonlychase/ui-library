<script setup lang="ts">
  const props = defineProps({
    grow: {
      type: Boolean,
      default: false,
    },
    contentPadding: {
      type: Boolean,
      default: false,
    },
    overflowContent: {
      type: Boolean,
      default: false,
    },
    tabs: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      default: null,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['update:value']);
</script>

<template>
  <div class="WcTabs bg-white flex-auto w-full" :class="{ flex: vertical }">
    <div
      class="WcTabs-header flex relative"
      :class="{ 'flex-col mb-0 flex-grow-0 flex-shrink': vertical }"
    >
      <div
        v-for="tab in tabs"
        :key="tab"
        class="WcTabs-tab text-gray-600 text-sm capitalize py-4 border-b-2 cursor-pointer flex justify-center items-center px-6 font-semibold"
        :class="{
          'text-blue-500 border-blue-500': value === tab,
          'w-full': grow,
        }"
        tabindex="0"
        role="tab"
        @click="$emit('update:value', tab)"
      >
        <slot :name="`tab-head-${tab}`">
          {{ tab }}
        </slot>
      </div>
    </div>
    <div
      class="WcTabs-content"
      :class="{
        'overflow-x-auto': overflowContent,
        'p-6': contentPadding,
        'flex-grow flex-shrink-0': vertical,
      }"
    >
      <slot :name="value" :tab="value" />
    </div>
  </div>
</template>
