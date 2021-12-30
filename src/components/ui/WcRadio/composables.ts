import { computed, ref, watch } from 'vue';
import { getValueName } from '@/utils/helpers';

const selected = ref({});

const api = (emit, props) => {
  const label = computed(() => getValueName(props.option));
  const isChecked = getValueName(props.value) === label.value;

  watch(
    () => selected.value,
    (option) => {
      emit('update:value', { ...option });
    },
  );

  return { isChecked, label, selected };
};

export { api };
