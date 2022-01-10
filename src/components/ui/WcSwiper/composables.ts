import { watch } from 'vue';
import { useKeenSlider } from 'keen-slider/vue.es';
import 'keen-slider/keen-slider.min.css';

const api = (props, emit) => {
  const ResizePlugin = (slider) => {
    const observer = new ResizeObserver(() => {
      emit('resize');
    });

    slider.on('created', () => observer.observe(slider.container));
    slider.on('destroyed', () => observer.unobserve(slider.container));
  };

  const [container, slider] = useKeenSlider({ ...props.options }, [
    ResizePlugin,
  ]);

  watch(
    () => slider.value,
    (val) => {
      val && emit('swiper', val);
    },
    { immediate: true },
  );

  return { container };
};

export { api };
