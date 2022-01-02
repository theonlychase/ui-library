<script setup lang="ts">
  import { ComponentOptionsWithArrayProps, computed } from 'vue';
  export type ButtonSizes = 'xSmall' | 'small' | 'medium' | 'large';

  const props = defineProps({
    block: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (val: ComponentOptionsWithArrayProps): boolean => {
        return val.match(/(xSmall|small|medium|large)/);
      },
    },
    truncate: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
      validator: (val: ComponentOptionsWithArrayProps): boolean => {
        return val.match(/(button|submit|reset)/);
      },
    },
    variation: {
      type: String,
      default: 'primary',
      validator: (val: ComponentOptionsWithArrayProps): boolean => {
        return val.match(/(primary|secondary|white|text|error)/);
      },
    },
  });

  const variations = {
    primary: 'text-white bg-blue-500 hover:bg-blue-600',
    secondary: 'text-white bg-gray-500 hover:bg-gray-600',
    white: '!border-gray-400 text-gray-700 bg-white hover:bg-gray-100',
    text: 'bg-transparent shadow-none text-gray-700 hover:bg-gray-100',
    error: 'bg-red-500 text-white hover:bg-red-600',
  };

  const computedClasses = computed(() => ({
    'pointer-events-none opacity-40': props.disabled,
    'w-full max-w-full justify-center': props.block,
    '!rounded-full': props.rounded || props.circle,
    'WcButton--circle': props.circle,
    [`WcButton--${props.size}`]: props.size,
  }));

  const computedVariation = computed(() => variations[props.variation]);
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="WcButton"
    :class="[computedClasses, computedVariation]"
    :title="title"
    :type="type"
  >
    <span v-if="$slots['icon-left']" class="mr-2">
      <slot name="icon-left" />
    </span>

    <span class="WcButton-label" :class="truncate && 'truncate'">
      <slot />
    </span>

    <span v-if="$slots['icon-right']" class="ml-2">
      <slot name="icon-right" />
    </span>
  </component>
</template>

<style>
  .WcButton {
    @apply border border-solid border-transparent shadow-sm font-medium rounded-md appearance-none leading-none inline-flex items-center
    select-none no-underline outline-none cursor-pointer focus:outline-none;
    @apply transition-colors duration-200 ease-in-out hover:transition-colors;
  }

  .WcButton--xSmall {
    @apply text-xs px-2.5 py-1.5;

    &.WcButton--circle {
      @apply px-1 py-1;
    }
  }

  .WcButton--small {
    @apply text-sm px-3 py-2;

    &.WcButton--circle {
      @apply px-1.5 py-1.5;
    }
  }

  .WcButton--medium {
    @apply text-base px-4 py-2;

    &.WcButton--circle {
      @apply px-2 py-2;
    }
  }

  .WcButton--large {
    @apply text-base px-6 py-3;

    &.WcButton--circle {
      @apply px-3 py-3;
    }
  }
</style>
