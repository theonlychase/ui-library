import { computed, nextTick, reactive, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import {
  getValueName,
  selectApi,
  setValueIndex,
} from '@/components/ui/WcSelect/composables.js';
import { keyCodes } from '@/utils/helpers.js';

const listbox = ref(null);
const listboxMenu = ref(null);
const listboxOptions = ref([]);
const listboxOpen = ref(false);

onClickOutside(listbox, (e) => {
  if (!(listbox.value === e.target || listbox.value.contains(e.target))) {
    listboxOpen.value = false;
  }
});

const listboxApi = (props, emit) => {
  const { allOptions, selectedIndex } = selectApi(props);
  const highlightedIndex = reactive(selectedIndex);

  const listboxLabel = computed(() => {
    return props.label ? 'listbox-label' : null;
  });

  const selectedValue = computed(() => {
    return getValueName(props.value) || props.placeholder;
  });

  const setSelectedValue = (option) => {
    listboxOpen.value = false;
    emit('update:value', option);
  };

  const { onKeyDown } = keyEvents(
    allOptions,
    emit,
    highlightedIndex,
    selectedIndex,
  );

  watch(
    () => listboxOpen.value,
    (val) => {
      if (!val) {
        highlightedIndex.value = setValueIndex(allOptions, props.value);
      }
    },
  );

  watch(
    () => highlightedIndex.value,
    (val) => {
      setScrollTop(val);
    },
    {
      flush: 'post',
    },
  );

  watch(
    listboxMenu,
    async (val) => {
      await nextTick();
      if (listboxOpen.value) {
        listboxOptions.value = [...val.children];
        selectedIndex.value !== -1 && setScrollTop(selectedIndex.value);
      }
    },
    {
      flush: 'post',
    },
  );

  return {
    allOptions,
    highlightedIndex,
    listbox,
    listboxLabel,
    listboxOpen,
    listboxMenu,
    onKeyDown,
    selectedIndex,
    selectedValue,
    setSelectedValue,
  };
};

const keyEvents = (options, emit, highlightedIndex, selectedIndex) => {
  const lastIndex = options.value.length - 1;

  const onKeyDown = (e) => {
    const keyCode = e.keyCode;
    e.preventDefault();
    e.stopPropagation();

    if (keyCodes.up === keyCode) {
      prevValue(lastIndex, highlightedIndex, selectedIndex);
    }
    if (keyCodes.down === keyCode) {
      nextValue(lastIndex, highlightedIndex, selectedIndex);
    }
    if (keyCodes.enter === keyCode || keyCodes.space === keyCode) {
      onKeySelect();
    }
    if (keyCodes.tab === keyCode) {
      e.target.blur();
      closeListbox();
    }
    if (keyCodes.esc === keyCode) {
      closeListbox();
    }
    if (keyCode >= 65 && keyCode <= 90) {
      if (listboxOpen.value) {
        const search = e.key.toLowerCase();
        highlightedIndex.value = setSearchedValue(options, search);
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
      listboxOpen.value = false;
      emit('update:value', selected);
    }
  };

  return { onKeyDown };
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

const setScrollTop = (index) => {
  const el = listboxOptions.value[index];
  if (listboxMenu.value) {
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

export { getValueName, listboxApi };
