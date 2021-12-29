import { computed } from 'vue';
import { getValueName } from '@/utils/helpers';

const api = (emit, props) => {
  const label = computed(() => getValueName(props.option));
  const index = computed(() =>
    props.value.findIndex((i) => getValueName(i) === label.value),
  );
  const checked = computed(() => {
    return props.value
      .map((val) => getValueName(val))
      .find((name) => name === label.value);
  });

  const setCheckedValues = () => {
    const allChecked = [...props.value];
    checked.value && allChecked.splice(index.value, 1);
    !checked.value && allChecked.push(props.option);
    emit('update:value', allChecked);
  };

  return { checked, label, setCheckedValues };
};

export { api };
