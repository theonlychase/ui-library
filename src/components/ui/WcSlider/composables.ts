import {
  computed,
  onBeforeUnmount,
  onUpdated,
  ref,
  Ref,
  watch,
  watchEffect,
} from 'vue';

const activeIndex = ref(0);
const container: Ref = ref(null);
const childSlides: Ref<HTMLElement[]> = ref([]);
const disableBtns = ref(true);
const endingIndex = ref(3);
const entriesIntersected: Ref<number[]> = ref([]);
const showPrevBtn = ref(false);
const showNextBtn = ref(false);
const scrollToEnd = ref(false);
const scrollToStart = ref(false);
const transition = ref(0);
const lazyIndex = ref(3);
const observer: Ref<IntersectionObserver | null> = ref(null);

const initSlider = (props) => {
  const computedSlides = computed(() =>
    props.slides.slice(0, endingIndex.value),
  );

  onUpdated(() => {
    const children = [...container.value.children].filter(
      (child) => !childSlides.value.includes(child),
    );

    childSlides.value.push(...children);

    children.forEach((slide) => observer.value?.observe(slide));
  });

  onBeforeUnmount(() => {
    observer.value?.disconnect();
  });

  watch(
    () => activeIndex.value,
    (val) => {
      if (val % lazyIndex.value === 0) {
        endingIndex.value += lazyIndex.value;
      }
    },
    { immediate: true },
  );

  watchEffect(
    () => {
      initObserver();
    },
    {
      flush: 'post',
    },
  );

  return {
    computedSlides,
    container,
    disableBtns,
    scrollNext,
    scrollPrev,
    showPrevBtn,
    showNextBtn,
  };
};

const scrollNext = () => {
  const { offsetWidth, offsetParent } = container.value;
  const parentOffset = offsetWidth - offsetParent.offsetWidth;

  if (scrollToEnd.value) {
    transition.value = parentOffset;
  } else {
    transition.value += childSlides.value[1].offsetWidth + 12;
  }

  container.value.style.transform = `translate3d(${-transition.value}px, 0, 0)`;
};

const scrollPrev = () => {
  if (scrollToStart.value) {
    transition.value = 0;
  } else {
    transition.value -= childSlides.value[1].offsetWidth + 12;
  }

  container.value.style.transform = `translate3d(${-transition.value}px, 0, 0)`;
};

const initObserver = () => {
  if (!observer.value) {
    observer.value = new IntersectionObserver(handleIntersect, {
      root: container.value?.offsetParent,
    });
  }

  childSlides.value = [...container.value.children];

  childSlides.value.forEach((child) => {
    observer.value?.observe(child);
  });
};

const handleIntersect = (entries, observer) => {
  const entriesIntersecting = entries.filter((entry) => entry.isIntersecting);
  const equalLength = entriesIntersecting.length === childSlides.value.length;
  const allIntersecting = entriesIntersecting.every(
    (entry) => entry.isIntersecting === true,
  );

  if (equalLength && allIntersecting) {
    observer.disconnect();
  } else {
    disableBtns.value = false;
    entries.forEach((entry) => {
      const entryIndex: number = [...childSlides.value].indexOf(entry.target);

      if (entry.target === childSlides.value[0]) {
        showPrevBtn.value = entry.isIntersecting;
      }

      if (entry.target === childSlides.value[childSlides.value.length - 1]) {
        showNextBtn.value = entry.isIntersecting;
      }

      if (entry.target === childSlides.value[2]) {
        scrollToStart.value = entry.isIntersecting;
      }

      if (entry.target === childSlides.value[childSlides.value.length - 2]) {
        scrollToEnd.value = entry.isIntersecting;
      }

      if (
        entry.isIntersecting &&
        !entriesIntersected.value.includes(entryIndex)
      ) {
        entriesIntersected.value.push(entryIndex);
        activeIndex.value = entryIndex;
        unobserveEntry(entry);
      }
    });
  }
};

const unobserveEntry = (entry) => {
  if (
    entry.target !== childSlides.value[childSlides.value.length - 1] &&
    entry.target !== childSlides.value[0] &&
    entry.target !== childSlides.value[2] &&
    entry.target !== childSlides.value[childSlides.value.length - 2]
  ) {
    observer.value?.unobserve(entry.target);
  }
};

export { initSlider };
