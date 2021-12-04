<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dimmed: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: null,
    },
    linkTitle: {
      type: String,
      default: null,
    },
    nuxt: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return value.match(/(xSmall|small|medium|large)/);
      },
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => {
        return value.match(/(button|submit|reset)/);
      },
    },
    variation: {
      type: String,
      default: 'primary',
      validator: (value) => {
        return value.match(/(primary|secondary|link|text)/);
      },
    },
  });
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :href="props.href"
    class="WcButton"
    :class="{
      'WcButton--disabled': props.disabled,
      'WcButton--anchor': props.href,
      'WcButton--block': props.block,
      'WcButton--rounded': props.rounded,
      'WcButton--dimmed': props.dimmed,
      [`WcButton--${props.variation}`]: props.variation,
      [`WcButton--${props.size}`]: props.size,
    }"
  >
    <span v-if="$slots['icon-left']" class="mr-2">
      <slot name="icon-left" />
    </span>

    <span class="WcButton-label">
      <slot />
    </span>

    <span v-if="$slots['icon-right']" class="ml-2">
      <slot name="icon-right" />
    </span>
  </component>
</template>

<style>
  .WcButton {
    @apply text-sm uppercase font-medium appearance-none leading-none border border-solid rounded min-w-[3rem] flex items-center
    select-none no-underline outline-none cursor-pointer px-4 focus:outline-none;
    @apply transition-colors duration-50 ease-out;
  }

  .WcButton--disabled {
    @apply bg-blue-700 pointer-events-none opacity-40;

    &.WcButton--text,
    &.WcButton--secondary {
      @apply bg-gray-200 text-gray-600 opacity-60 border-0;
    }
  }
  .WcButton--xSmall {
    @apply text-xs h-6 py-0 px-2;
  }

  .WcButton--small {
    @apply text-sm h-8 py-0 px-3;
  }

  .WcButton--medium {
    @apply h-10;
  }

  .WcButton--large {
    @apply text-base h-12 py-0 px-6;
  }

  .WcButton--primary {
    @apply bg-blue-700 border-blue-700 hover:border-blue-800 hover:bg-blue-800 focus:border-blue-700 focus:bg-blue-700 text-white;
  }

  .WcButton--secondary {
    @apply bg-white text-blue-700 border-blue-700 hover:bg-blue-50 focus:border-gray-600 focus:bg-gray-50 focus:text-gray-700;
  }

  .WcButton--text {
    @apply bg-transparent text-blue-700 border-transparent hover:bg-blue-100 focus:text-gray-700;
  }

  .WcButton--rounded {
    &.WcButton--xSmall {
      @apply rounded-lg;
    }

    &.WcButton--small {
      @apply rounded-xl;
    }

    &.WcButton--medium {
      @apply rounded-2xl;
    }

    &.WcButton--large {
      @apply rounded-[1.25rem];
    }
  }

  .WcButton--block {
    @apply w-full max-w-full justify-center;
  }

  .WcButton--anchor {
    @apply inline-flex hover:no-underline;
  }
</style>
