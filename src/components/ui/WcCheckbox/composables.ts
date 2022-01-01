import { computed, ref, watch } from 'vue';
import { getValueName } from '@/utils/helpers';

const selected = ref([]);

const api = (emit, props) => {
  const label = computed(() => getValueName(props.option));

  watch(
    () => selected.value,
    (option) => {
      emit('update:value', [...option]);
    },
  );

  return { label, selected };
};

export { api };