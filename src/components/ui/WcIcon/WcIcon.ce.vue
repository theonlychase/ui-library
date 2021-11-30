<script setup lang="ts">
  import { defineProps, computed } from 'vue';
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
    class="WcIcon"
    :class="computedClasses"
    :fill="color"
    role="presentation"
    v-html="computedSvg"
  />
</template>

<style>
  /* Vanilla CSS for Web Components */
  .WcIcon {
    display: flex;
    user-select: none;
  }
  /* icons sizes */
  .WcIcon--xxSmall {
    width: 1rem;
    height: 1rem;
  }

  .WcIcon--xSmall {
    width: 1.25rem;
    height: 1.25rem;
  }

  .WcIcon--small {
    width: 1.5rem;
    height: 1.5rem;
  }

  .WcIcon--medium {
    width: 2rem;
    height: 2rem;
  }

  .WcIcon--large {
    width: 2.5rem;
    height: 2.5rem;
  }

  .WcIcon--xLarge {
    width: 3rem;
    height: 3rem;
  }
</style>
