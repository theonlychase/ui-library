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
    viewBox: {
      type: String,
      default: '0 0 24 24',
    },
  });

  const computedAttrs = computed(() => {
    return props.name.toLocaleLowerCase().includes('stroke')
      ? { stroke: props.color }
      : { fill: props.color };
  });

  const computedClasses = computed(() => ({
    [`WcIcon--${props.size}`]: props.size,
  }));
  const computedSvg = computed(
    () => `<title>${props.name}</title>${icons[props.name]}`,
  );
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    class="WcIcon select-none"
    :class="computedClasses"
    role="presentation"
    v-bind="computedAttrs"
    v-html="computedSvg"
  />
</template>

<style scoped>
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
