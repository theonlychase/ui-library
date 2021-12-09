import { computed, ref, watch } from 'vue';
import { isObject } from '@/utils/helpers';

const selectProps = (props) => {
  const selectedIndex = ref(-1);

  const filterDuplicates = (options) => {
    const uniqueValues = new Map();

    options.forEach((value) => {
      const id = getValueId(value);

      !uniqueValues.has(id) && uniqueValues.set(id, value);
    });

    return Array.from(uniqueValues.values());
  };

  const allOptions = computed(() => {
    return props.options.length ? filterDuplicates(props.options) : [];
  });

  const getValueIndex = (value) => {
    return allOptions.value.findIndex((val) => {
      const name = getValueName(val);
      return name === value;
    });
  };

  const getSelectedValue = (value) => {
    return allOptions.value.find((val) => {
      const name = getValueName(val);
      return name === value;
    });
  };

  const getValueId = (value) => {
    return isObject(value) ? value.id : value;
  };

  const getValueName = (value) => {
    return isObject(value) ? value.name : value;
  };

  watch(
    () => props.value,
    (val) => {
      selectedIndex.value = getValueIndex(val);
    },
    { immediate: true },
  );

  return {
    allOptions,
    getValueId,
    getValueName,
    getSelectedValue,
    selectedIndex,
  };
};

export { selectProps };
