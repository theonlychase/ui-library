<script setup lang="ts">
  const props = defineProps({
    block: {
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
    :is="href ? 'a' : 'button'"
    :href="href"
    class="WcButton"
    :class="{
      'WcButton--disabled': disabled,
      'WcButton--anchor': href,
      'WcButton--block': block,
      'WcButton--rounded': rounded,
      [`WcButton--${variation}`]: variation,
      [`WcButton--${size}`]: size,
    }"
    :title="title"
    :type="type"
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
    @apply border border-solid border-transparent shadow-sm font-medium rounded appearance-none leading-none rounded inline-flex items-center
    select-none no-underline outline-none cursor-pointer focus:outline-none;
    @apply transition-colors duration-50 ease-out hover:transition-colors;

    &.WcButton--primary {
      @apply text-white border-transparent bg-blue-500 hover:bg-blue-600;
    }

    &.WcButton--secondary {
      @apply text-blue-700 bg-blue-100 hover:bg-blue-200;
    }

    &.WcButton--text {
      @apply bg-transparent text-blue-500 border-transparent hover:bg-blue-100 focus:text-gray-700;
    }

    &.WcButton--disabled {
      @apply bg-blue-500 pointer-events-none opacity-40;

      &.WcButton--text,
      &.WcButton--secondary {
        @apply bg-gray-200 text-gray-600 opacity-60 border-0;
      }
    }
  }

  .WcButton--xSmall {
    @apply text-xs px-2.5 py-1.5;
  }

  .WcButton--small {
    @apply text-sm px-3 py-2;
  }

  .WcButton--medium {
    @apply text-base px-4 py-2;
  }

  .WcButton--large {
    @apply text-base px-6 py-3;
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
