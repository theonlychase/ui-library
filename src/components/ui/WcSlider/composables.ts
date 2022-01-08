import { computed, onMounted, ref, Ref, watchEffect } from 'vue';

const currentSlides = ref([]);
const container = ref(null);
const lazyIndex = ref(4);
const loadAll = ref(false);
const observer: Ref<IntersectionObserver | null> = ref(null);
const threshold = [0.15, 0.9];

const initSlider = (props) => {
  currentSlides.value = props.slides;

  onMounted(() => {
    initObserver();
  });

  // watchEffect(
  //   () => {
  //     currentSlides.value =
  //   },
  //   {
  //     flush: 'post',
  //   },
  // );

  const handleSlides = computed(() =>
    currentSlides.value.slice(0, lazyIndex.value),
  );

  return { container, handleSlides };
};

const initObserver = () => {
  observer.value = new IntersectionObserver(handleIntersect, {
    root: container.value,
    threshold,
  });
};

const handleIntersect = (entries, observer) => {
  console.log('test');
};

export { initSlider };
