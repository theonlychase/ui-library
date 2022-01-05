import { ref } from 'vue';
import { useKeenSlider } from 'keen-slider/vue.es';
import 'keen-slider/keen-slider.min.css';

const current = ref(1);

const initSwiper = () => {
  const [container, slider] = useKeenSlider({
    initial: current.value,
    slides: {
      perView: 'auto',
      spacing: 12,
    },
    slideChanged: (s) => {
      current.value = s.track.details.rel;
    },
  });

  return { container, current, slider };
};

export { initSwiper };
