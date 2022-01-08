<script setup lang="ts">
  import { initSlider } from './composables';
  import WcIcon from '@/components/ui/WcIcon/WcIcon.vue';

  export interface SwiperProps {
    slides: [];
    width: string;
  }

  const props = withDefaults(defineProps<SwiperProps>(), {
    slides: () => [],
    width: '100%',
  });

  const { container, handleSlides } = initSlider(props);
</script>

<template>
  <div class="slider relative overflow-hidden">
    <div
      ref="container"
      class="slider__container grid grid-flow-col auto-cols-min gap-x-3"
    >
      <slot v-for="slide in handleSlides" :slide="slide" />
    </div>
  </div>
</template>

<style>
  .slider {
    & .slider__container > * {
      @apply max-w-full flex-shrink-0;
    }

    &::-webkit-scrollbar {
      /* WebKit */
      width: 0;
      height: 0;
    }
  }
</style>
