<script setup lang="ts">
  import { WcSwiper, WcSwiperSlide } from '@/components/ui/WcSwiper';
  import { api, ImageProps, ImageSize } from './composables';

  interface GalleryProps {
    baseImgUrl?: string;
    images: ImageProps[];
    pagination?: boolean;
    sourceQuality?: ImageSize;
  }

  const emit = defineEmits(['change']);
  const props = withDefaults(defineProps<GalleryProps>(), {
    baseImgUrl: '',
    images: () => [],
    pagination: false,
    sourceQuality: 'medium',
  });

  const {
    activeIndex,
    config,
    leftTransition,
    onResize,
    placeholder,
    placeholderClasses,
    slider,
    swiperStyles,
  } = api(props, emit);
</script>

<template>
  <div class="relative">
    <span
      class="absolute right-2 top-2 z-10 px-2.5 py-0.5 inline-flex items-center rounded-md text-sm bg-gray-900 text-white font-semibold"
    >
      {{ activeIndex + 1 }} / {{ images.length }}
    </span>

    <wc-button
      v-if="slider && activeIndex !== 0"
      circle
      size="small"
      class="absolute left-4 right-auto top-1/2 z-10 -translate-y-1/2 cursor-pointer !bg-white opacity-90 hidden md:block"
      @click.prevent="slider.prev()"
    >
      <wc-icon name="chevronLeft" class="text-gray-900" />
    </wc-button>

    <div
      ref="placeholder"
      class="z-0 w-full md:mx-auto"
      :class="placeholderClasses"
    >
      <img
        :src="images[activeIndex].source[sourceQuality]"
        alt="Gallery Placeholder"
      />
    </div>

    <wc-swiper
      v-if="images && images.length"
      :style="swiperStyles"
      :options="config"
      @swiper="(val) => (slider = val)"
      @change="(val) => (activeIndex = val)"
      @resize="onResize"
    >
      <wc-swiper-slide v-for="i in 2" :key="i">
        <slot :name="i === 0 ? 'first' : 'second'">
          <img
            :src="images[i].source[sourceQuality]"
            :alt="images[i].source.description"
          />
        </slot>
      </wc-swiper-slide>
    </wc-swiper>

    <wc-button
      v-if="slider && activeIndex !== images.length - 1"
      circle
      size="small"
      class="absolute right-4 left-auto top-1/2 z-10 -translate-y-1/2 cursor-pointer !bg-white opacity-90 hidden md:block"
      @click.prevent="slider.next()"
    >
      <wc-icon name="chevronRight" class="text-gray-900" />
    </wc-button>

    <div
      v-if="pagination"
      class="absolute left-1/2 -translate-x-1/2 top-full text-center transition-opacity z-10 overflow-hidden w-20 whitespace-nowrap"
    >
      <span
        v-for="(_imageIndex, imageIndex) in images"
        :key="imageIndex"
        class="pagination w-2 h-2 w-full inline-block rounded-full bg-gray-400 opacity-80 mx-1 relative scale-[.33]"
        :class="{
          '!opacity-100 !bg-blue-500 !scale-100': activeIndex === imageIndex,
          '!scale-[.66]':
            imageIndex === activeIndex + 1 || imageIndex === activeIndex - 1,
        }"
        :style="{ left: `${leftTransition}px` }"
      />
    </div>
  </div>
</template>

<style>
  .pagination {
    transition: 0.2s transform, 0.2s left;
  }
</style>
