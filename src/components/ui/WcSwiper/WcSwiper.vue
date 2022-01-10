<script setup lang="ts">
  import { api } from './composables';

  interface SwiperProps {
    options?: object;
  }

  const emit = defineEmits(['resize', 'swiper']);
  const props = withDefaults(defineProps<SwiperProps>(), {
    options: () => ({}),
  });

  const { container } = api(props, emit);
</script>

<template>
  <div ref="container" class="keen-slider cursor-grab active:cursor-grabbing">
    <slot />
  </div>
</template>
