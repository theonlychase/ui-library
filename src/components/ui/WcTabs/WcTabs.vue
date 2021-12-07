<script setup lang="ts">
  import { computed } from 'vue';
  interface Tab {
    id: string;
    name: string;
  }

  const props = defineProps({
    value: {
      type: String,
      default: null,
    },
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
    size: {
      type: String,
      default: 'medium',
      validator: (size) => {
        return size.match(/(small|medium)/);
      },
    },
    tabs: {
      type: Array,
      required: true,
      validator: (tabs: Array<Tab>) => {
        return tabs.every((tab: Tab) => {
          return Boolean(tab.id && tab.name);
        });
      },
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['update:value']);

  const tabContent = computed(() => {
    return props.tabs.find((tab) => tab.id === props.value);
  });
</script>

<template>
  <div
    class="WcTabs bg-white flex-auto w-full"
    :class="{ 'WcTabs-grow': grow, 'WcTabs-vertical': vertical }"
  >
    <div class="WcTabs-header flex relative">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="WcTabs-tab text-gray-600 text-sm capitalize py-4 cursor-pointer flex justify-center items-center"
        :class="{
          'WcTabs-tab--active': value === tab.id,
          [`WcTabs-tab--${size}`]: size,
        }"
        tabindex="0"
        role="tab"
        @click="$emit('update:value', tab.id)"
      >
        <slot :name="`tab-head-${tab.id}`">
          {{ tab.name }}
        </slot>
      </div>
    </div>
    <div
      class="WcTabs-content"
      :class="{
        'overflow-x-auto': overflowContent,
        'p-6': contentPadding,
      }"
    >
      <slot :name="value" :tab="value" :content="tabContent" />
    </div>
  </div>
</template>

<style>
  .WcTabs-tab {
    box-shadow: inset 0 -1px 0 #4b5563;
    &.WcTabs-tab--active {
      @apply text-blue-700;
      box-shadow: inset 0 -3px 0 #0ea5e9;
    }
    &.WcTabs-tab--medium {
      @apply px-6;
    }
    &.WcTabs-tab--small {
      @apply px-2;
    }
  }
  .WcTabs-vertical {
    @apply flex;
    & .WcTabs-header {
      @apply flex-col mb-0;
      flex: 1 0 auto;
    }
    & .WcTabs-content {
      flex: 0 1 100%;
    }
  }
  .WcTabs-grow {
    & .WcTabs-tab {
      @apply w-full;
    }
  }
</style>
