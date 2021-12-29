import { computed, ref, watch } from 'vue';
import { filterDuplicates, getValueName } from '@/utils/helpers.ts';

const setValueIndex = (options, value) => {
  return options.value.findIndex(
    (val) => getValueName(value) === getValueName(val),
  );
};

const selectApi = (props) => {
  const selectedIndex = ref(-1);

  const allOptions = computed(() => {
    return props.options.length ? filterDuplicates(props.options) : [];
  });

  watch(
    () => props.value,
    (val) => {
      selectedIndex.value = setValueIndex(allOptions, val);
    },
    { immediate: true },
  );

  return {
    allOptions,
    selectedIndex,
  };
};

export { selectApi, setValueIndex };
