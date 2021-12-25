<script setup lang="ts">
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
        return value.match(/(primary|secondary|text)/);
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
      'w-full max-w-full justify-center': block,
      'rounded-full': rounded || circle,
      'WcButton--circle': circle,
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
    @apply transition-colors duration-200 ease-in-out hover:transition-colors;

    &.WcButton--primary {
      @apply text-white bg-blue-500 hover:bg-blue-600;
    }

    &.WcButton--secondary {
      @apply border-gray-300 text-gray-700 bg-white hover:bg-gray-100;
    }

    &.WcButton--text {
      @apply bg-transparent shadow-none text-blue-500 hover:bg-blue-100;
    }

    &.WcButton--disabled {
      @apply bg-blue-500 pointer-events-none opacity-40;

      &.WcButton--text,
      &.WcButton--secondary {
        @apply bg-gray-200 text-gray-600 opacity-60;
      }
    }
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
