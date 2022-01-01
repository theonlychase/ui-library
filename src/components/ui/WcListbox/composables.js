import { computed, nextTick, reactive, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { getValueName, keyCodes } from '@/utils/helpers';
import {
  selectApi,
  setValueIndex,
} from '@/components/ui/WcSelect/composables.js';

const listbox = ref(null);
const listboxOpen = ref(false);
const lastIndex = ref(0);
const internalValue = ref(null);
const internalSearch = ref('');
const focused = ref(false);
onClickOutside(listbox, (e) => {
  if (!(listbox.value === e.target || listbox.value.contains(e.target))) {
    listboxOpen.value = false;
  }
});

const api = (props, emit) => {
  const { allOptions, selectedIndex } = selectApi(props);
  const highlightedIndex = reactive(selectedIndex);

  const selectedValue = computed(() => {
    return getValueName(props.value) || props.placeholder;
  });

  const setSelectedValue = (option) => {
    internalValue.value = option;
    listboxOpen.value = false;
    emit('update:value', option);
    props.autocomplete && emit('update:search', getValueName(option));
  };

  const { onKeyDown } = keyEvents(
    allOptions,
    emit,
    highlightedIndex,
    props.autocomplete,
    selectedIndex,
  );

  watch(
    () => listboxOpen.value,
    async (val) => {
      if (props.autocomplete && val) {
        await nextTick();
        highlightedIndex.value = 0;
      }

      if (!props.autocomplete && !val) {
        highlightedIndex.value = setValueIndex(allOptions, props.value);
      }
    },
  );

  if (props.autocomplete) {
    watch(
      () => allOptions.value,
      (val) => {
        if (val.length) {
          lastIndex.value = val.length - 1;
          if (!internalValue.value) {
            listboxOpen.value = true;
          }
        }
        if (!val.length) {
          listboxOpen.value = !!(props.noResults && props.search);
        }
      },
      { deep: true },
    );

    watch(
      () => props.search,
      (val) => {
        !val && emit('update:value', null);
        if (props.value) {
          internalValue.value = null;
        }
      },
    );

    watch(
      () => internalSearch.value,
      (searchValue) => {
        emit('update:search', searchValue);
      },
    );
  }

  return {
    allOptions,
    focused,
    highlightedIndex,
    listbox,
    listboxOpen,
    onFocus,
    onKeyDown,
    selectedIndex,
    selectedValue,
    setSelectedValue,
  };
};

const keyEvents = (
  options,
  emit,
  highlightedIndex,
  autocomplete,
  selectedIndex,
) => {
  lastIndex.value = options.value.length - 1;

  const onKeyDown = (e) => {
    const keyCode = e.keyCode;

    if (!autocomplete) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (keyCodes.up === keyCode) {
      listboxOpen.value &&
        prevValue(lastIndex.value, highlightedIndex, selectedIndex);
    }
    if (keyCodes.down === keyCode) {
      listboxOpen.value &&
        nextValue(lastIndex.value, highlightedIndex, selectedIndex);
    }
    if (keyCodes.enter === keyCode) {
      if (autocomplete && !options.value.length) return;
      onKeySelect();
    }
    if (keyCodes.space === keyCode && !autocomplete) {
      onKeySelect();
    }
    if (keyCodes.tab === keyCode) {
      e.target.blur();
      closeListbox();
    }
    if (keyCodes.esc === keyCode) {
      closeListbox();
    }
    if (keyCode >= 65 && keyCode <= 90 && !autocomplete) {
      if (listboxOpen.value) {
        const search = e.key.toLowerCase();
        const searchIndex = setSearchedValue(options, search);
        if (searchIndex !== -1) {
          highlightedIndex.value = searchIndex;
        }
      }
    }
  };

  const onKeySelect = () => {
    if (!listboxOpen.value) {
      listboxOpen.value = true;
      return;
    }

    if (listboxOpen.value) {
      const selected = options.value[highlightedIndex.value];
      internalValue.value = selected;
      listboxOpen.value = false;
      emit('update:value', selected);
      autocomplete && emit('update:search', getValueName(selected));
    }
  };

  return { onKeyDown };
};

const onFocus = (search, options) => {
  if (search && options.length) {
    listboxOpen.value = true;
  }
};

const onMousedown = () => {
  focused.value = true;
};

const onMouseup = () => {
  focused.value = false;
};

const setInternalSearch = (emit, searchValue) => {
  internalSearch.value = searchValue;

  !searchValue && emit('update:search', '');
};

const setScrollTop = (index, listboxMenu, listboxOptions) => {
  const el = listboxOptions.value[index];
  if (listboxMenu.value && el) {
    const { clientHeight, scrollHeight, scrollTop } = listboxMenu.value;
    const fromTop = el.offsetTop + el.clientHeight;
    if (fromTop > clientHeight) {
      listboxMenu.value.scrollTop = scrollHeight - clientHeight;
    }
    if (scrollTop > 0 && fromTop < clientHeight) {
      if (el.clientHeight > scrollTop) {
        listboxMenu.value.scrollTop -= el.clientHeight;
      } else {
        listboxMenu.value.scrollTop = 0;
      }
    }
  }
};

const closeListbox = () => {
  if (listboxOpen.value) {
    listboxOpen.value = false;
  }
};

const openListbox = () => {
  if (!listboxOpen.value) {
    listboxOpen.value = true;
  }
};

const nextValue = (lastIndex, highlightedIndex, selectedIndex) => {
  openListbox();

  highlightedIndex.value =
    selectedIndex.value < lastIndex ? selectedIndex.value + 1 : 0;
};

const prevValue = (lastIndex, highlightedIndex, selectedIndex) => {
  openListbox();

  highlightedIndex.value =
    selectedIndex.value > 0 ? selectedIndex.value - 1 : lastIndex;
};

const setSearchedValue = (options, search) => {
  return options.value.findIndex((option) =>
    getValueName(option).toLowerCase().startsWith(search),
  );
};

export { api, onMousedown, onMouseup, setInternalSearch, setScrollTop };
