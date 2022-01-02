import { computed, inject, provide, Ref, ref, toRef, watch } from 'vue';

const panelsOpen: Ref<Array<number>> = ref([]);
const buttonClasses = {
  xSmall: {
    font: 'text-xs',
    icon: 'xSmall',
  },
  small: {
    font: 'text-sm',
    icon: 'small',
  },
  medium: {
    font: 'text-base',
    icon: 'small',
  },
  large: {
    font: 'text-lg',
    icon: 'medium',
  },
};

const api = (props, emit) => {
  const single: Ref<boolean> = toRef(props, 'single');
  const size: Ref<string> = toRef(props, 'size');
  provide('panelsOpen', panelsOpen);
  provide('single', single);
  provide('size', size);

  watch(
    () => panelsOpen.value,
    (val) => {
      emit('update:value', val);
    },
    { deep: true },
  );
  return { panelsOpen };
};

const setPanelOpen = (id, single) => {
  if (single) return setSingle(id);
  return setMultiple(id);
};

const setMultiple = (id) => {
  if (isPanelOpen(id)) {
    panelsOpen.value = panelsOpen.value.filter((panelId) => panelId !== id);
  } else {
    panelsOpen.value.push(id);
  }
};

const setSingle = (id) => {
  if (isPanelOpen(id)) {
    panelsOpen.value = [];
  } else {
    panelsOpen.value.splice(0, 1, id);
  }
};

const injectItemData = (id) => {
  const panelsOpen = inject('panelsOpen') as Ref;
  const single = inject('single') as Ref;

  const isOpen = computed(() => panelsOpen.value.includes(id));

  return { isOpen, single };
};

const isPanelOpen = (id) => panelsOpen.value.includes(id);

export { api, buttonClasses, injectItemData, setPanelOpen };
