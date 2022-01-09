import { computed, onMounted, ref, Ref, watchEffect } from 'vue';

const container: Ref<HTMLElement | null> = ref(null);
const childOffset = ref(0);
const disableBtns = ref(true);
const endingIndex = ref(6);
const showPrevBtn = ref(false);
const showNextBtn = ref(false);
const scrollToEnd = ref(false);
const scrollToStart = ref(false);
const transition = ref(0);
const lazyIndex = ref(4);
const observer: Ref<IntersectionObserver | null> = ref(null);

const initSlider = (props) => {
  const computedSlides = computed(() =>
    props.slides.slice(0, endingIndex.value),
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
    transition.value += childOffset.value;
  }

  container.value.style.transform = `translate3d(${-transition.value}px, 0, 0)`;
};

const scrollPrev = () => {
  if (scrollToStart.value) {
    transition.value = 0;
  } else {
    transition.value -= childOffset.value;
  }

  container.value.style.transform = `translate3d(${-transition.value}px, 0, 0)`;
};

const initObserver = () => {
  if (!observer.value) {
    observer.value = new IntersectionObserver(handleIntersect, {
      root: container.value.offsetParent,
    });
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const children = [...container.value.children];
  childOffset.value = children[1].offsetWidth + 12;

  children.forEach((child) => {
    observer.value?.observe(child);
  });
};

const handleIntersect = (entries, observer) => {
  const children = container.value.children;
  const entriesIntersecting = entries.filter((entry) => entry.isIntersecting);
  const equalLength = entriesIntersecting.length === children.length;
  const allIntersecting = entriesIntersecting.every(
    (entry) => entry.isIntersecting === true,
  );

  if (equalLength && allIntersecting) {
    observer.disconnect();
  } else {
    disableBtns.value = false;
    entries.forEach((entry) => {
      // Observe First Slide
      if (entry.target === children[0]) {
        showPrevBtn.value = entry.isIntersecting;
      }
      // Observe Last Slide
      if (entry.target === children[children.length - 1]) {
        showNextBtn.value = entry.isIntersecting;
      }

      // Observe First Slide
      if (entry.target === children[2]) {
        scrollToStart.value = entry.isIntersecting;
      }
      // Observe Last Slide
      if (entry.target === children[children.length - 3]) {
        scrollToEnd.value = entry.isIntersecting;
      }
    });
  }
};

// const unobserveEntry = (entry) => {};

export { initSlider };
