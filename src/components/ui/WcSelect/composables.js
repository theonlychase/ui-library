import { computed, ref, watch } from 'vue';
import { isObject } from '@/utils/helpers.js';

const filterDuplicates = (options) => {
  const uniqueValues = new Map();

  options.forEach((value) => {
    const id = getValueId(value);

    !uniqueValues.has(id) && uniqueValues.set(id, value);
  });

  return Array.from(uniqueValues.values());
};

const getValueId = (value) => {
  return isObject(value) ? value.id : value;
};

const getValueName = (value) => {
  return isObject(value) ? value.name : value;
};

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

export { selectApi, getValueId, getValueName, setValueIndex };
