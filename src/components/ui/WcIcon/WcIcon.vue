<script setup lang="ts">
  import { computed, ComponentOptionsWithArrayProps } from 'vue';
  import icons from './icons';

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: ComponentOptionsWithArrayProps): boolean => {
        return value.match(/(xxSmall|xSmall|small|medium|large|xLarge)/);
      },
    },
    attrs: {
      type: Object,
      default: () => ({
        viewBox: '0 0 20 20',
      }),
    },
  });

  const sizeClasses = {
    xxSmall: 'w-4 h-4',
    xSmall: 'w-5 h-5',
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-10 h-10',
    xLarge: 'w-12 h-12',
  };
  const computedIcon = computed(() => icons[props.name]);
  const computedSvg = computed(() => (computedIcon.value ? `<title>${props.name}</title>${computedIcon.value.path}` : null));
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current select-none"
    :class="[sizeClasses[props.size]]"
    role="presentation"
    v-bind="attrs"
    v-html="computedSvg"
  />
</template>
