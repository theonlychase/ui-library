<script setup lang="ts">
  import { initSlider } from './composables';
  import WcIcon from '@/components/ui/WcIcon/WcIcon.vue';
  import WcButton from '@/components/ui/WcButton/WcButton.vue';

  export interface SwiperProps {
    slides: [];
  }

  const props = withDefaults(defineProps<SwiperProps>(), {
    slides: () => [],
  });

  const {
    computedSlides,
    container,
    disableBtns,
    scrollNext,
    scrollPrev,
    showPrevBtn,
    showNextBtn,
  } = initSlider(props);
</script>

<template>
  <div class="slider relative overflow-hidden">
    <wc-button
      v-if="!showPrevBtn && !disableBtns"
      circle
      size="small"
      class="absolute left-4 right-auto top-1/2 z-10 -translate-y-1/2 cursor-pointer !bg-white opacity-90 hidden md:block"
      @click.prevent="scrollPrev"
    >
      <wc-icon name="chevronLeft" color="gray900" />
    </wc-button>

    <div
      ref="container"
      class="slider__container inline-flex w-full overflow-x-scroll md:overflow-x-hidden md:w-auto transition duration-200 ease-in-out sm-max:!transform-none"
    >
      <span class="slider__slide--first" />

      <div
        v-for="slide in computedSlides"
        :key="slide"
        class="mr-3 last-of-type:mr-0"
      >
        <slot :slide="slide" />
      </div>

      <span class="slider__slide--last" />
    </div>

    <wc-button
      v-if="!showNextBtn && !disableBtns"
      circle
      size="small"
      class="absolute right-4 left-auto top-1/2 z-10 -translate-y-1/2 cursor-pointer !bg-white opacity-90 hidden md:block"
      @click.prevent="scrollNext"
    >
      <wc-icon name="chevronRight" color="gray900" />
    </wc-button>
  </div>
</template>

<style>
  .slider,
  .slider__container {
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
</style>
