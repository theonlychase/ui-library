import { computed, ref, Ref, watch, watchEffect } from 'vue';
export type ImageSize = 'small' | 'medium';
export interface ImageProps {
  description: string;
  source: SourceType;
}
interface SourceType {
  small?: 'small';
  medium?: 'medium';
}

const slider = ref(null);
const placeholder: Ref<HTMLElement | null> = ref(null);
const activeIndex = ref(0);
const galleryMinHeight: Ref<number> = ref(0);
const imageReadyInterval = ref(0);
const leftTransition = ref(32);
const placeholderClasses = computed(() => {
  const absoluteClasses = 'absolute left-1/2 -translate-x-1/2';

  return galleryMinHeight.value ? absoluteClasses : null;
});
const swiperStyles = computed(() =>
  galleryMinHeight.value
    ? { minHeight: `${galleryMinHeight.value}px`, background: '#fff' }
    : null,
);

const api = (props, emit) => {
  const config = {
    initial: 0,
    loop: {
      min: 0,
      max: props.images.length - 1,
    },
    dragSpeed: 2,
    moveToIdx: {
      animation: {
        duration: 200,
      },
    },
    range: {
      align: true,
      min: 0,
      max: props.images.length - 1,
    },
    slideChanged: (s) => {
      activeIndex.value = s.track.details.abs;
      emit('change', activeIndex.value);
    },
    slides: {
      number: 2,
      perView: 1,
    },
  };

  watchEffect(
    () => {
      setImageInterval();
    },
    { flush: 'post' },
  );

  watch(
    () => activeIndex.value,
    (newVal, oldVal) => {
      if (newVal > oldVal) {
        leftTransition.value -= 16;
      } else {
        leftTransition.value += 16;
      }
    },
  );

  return {
    activeIndex,
    config,
    leftTransition,
    onResize,
    placeholder,
    placeholderClasses,
    slider,
    swiperStyles,
  };
};

const onResize = () => {
  setSwiperMinHeight();
};

const setImageInterval = () => {
  imageReadyInterval.value = window.setInterval(() => {
    if (placeholder.value) {
      setSwiperMinHeight();
      window.clearInterval(imageReadyInterval.value);
    }
  }, 100);
};

const setSwiperMinHeight = () => {
  galleryMinHeight.value = placeholder.value
    ? placeholder.value.clientHeight
    : 0;
};

export { api };
