<script setup lang="ts">
  import { initSwiper } from './composables';
  import WcIcon from '@/components/ui/WcIcon/WcIcon.vue';

  export interface SwiperProps {
    slides: [];
    width: string;
  }

  const props = withDefaults(defineProps<SwiperProps>(), {
    slides: () => [],
    width: '100%',
  });

  const { container, current, slider } = initSwiper();
</script>

<template>
  <div class="relative">
    <div ref="container" class="keen-slider">
      <div
        v-for="slide in slides"
        :key="slide"
        :style="{ width }"
        class="keen-slider__slide max-w-full flex-shrink-0"
      >
        <slot :slide="slide" />
      </div>
    </div>

    <div
      class="absolute hidden p-1 bg-white left-4 right-auto top-1/2 -translate-y-1/2 opacity-80 rounded-full cursor-pointer md:block"
      @click="slider.prev()"
    >
      <wc-icon name="chevronLeft" />
    </div>

    <div
      class="absolute hidden p-1 bg-white right-4 left-auto top-1/2 -translate-y-1/2 opacity-80 rounded-full cursor-pointer md:block"
      @click="slider.next()"
    >
      <wc-icon name="chevronRight" />
    </div>
  </div>
</template>

<style>
  .keen-slider__slide > * {
    @apply h-full max-w-full;
  }
</style>
