<script setup lang="ts">
  import { computed } from 'vue';
  import icons from './icons';

  const props = defineProps({
    color: {
      type: String,
      default: 'currentColor',
    },
    hoverColor: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return value.match(/(xxSmall|xSmall|small|medium|large|xLarge)/);
      },
    },
  });

  const strokeFill = computed(() => {
    return props.name.toLocaleLowerCase().includes('stroke');
  });

  const computedColor = computed(() => ({
    '--icon-color': `var(--color--${props.color})`,
  }));

  const computedHoverColor = computed(() => {
    return props.hoverColor
      ? { '--icon-color--hover': `var(--color--${props.hoverColor})` }
      : '';
  });

  const computedClasses = computed(() => ({
    [`WcIcon--${props.size}`]: props.size,
    'WcIcon--fill': !strokeFill.value,
    'WcIcon--fill--hover': !strokeFill.value && props.hoverColor,
    'WcIcon--stroke': strokeFill.value,
    'WcIcon--stroke--hover': strokeFill.value && props.hoverColor,
  }));
  const computedSvg = computed(
    () => `<title>${props.name}</title>${icons[props.name].path}`,
  );
  const computedViewBox = computed(() => icons[props.name].viewBox);
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="computedViewBox"
    class="WcIcon select-none"
    :class="computedClasses"
    :style="[computedColor, computedHoverColor]"
    role="presentation"
    v-html="computedSvg"
  />
</template>

<style>
  .WcIcon--fill {
    fill: var(--icon-color);
  }

  .WcIcon--fill--hover {
    &:hover {
      fill: var(--icon-color--hover);
    }
  }

  .WcIcon--stroke {
    stroke: var(--icon-color);
  }

  .WcIcon--stroke--hover {
    &:hover {
      stroke: var(--icon-color--hover);
    }
  }

  .WcIcon--xxSmall {
    @apply w-4 h-4;
  }

  .WcIcon--xSmall {
    @apply w-5 h-5;
  }

  .WcIcon--small {
    @apply w-6 h-6;
  }

  .WcIcon--medium {
    @apply w-8 h-8;
  }

  .WcIcon--large {
    @apply w-10 h-10;
  }

  .WcIcon--xLarge {
    @apply w-12 h-12;
  }
</style>
