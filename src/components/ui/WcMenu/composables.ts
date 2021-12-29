import { computed, ref, toRef, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
type Origin = 'right' | 'top' | 'left';
type Position = 'left' | 'right';
const origins = {
  right: 'origin-top-right',
  top: 'origin-top',
  left: 'origin-top-left',
};
const positions = {
  right: 'right-0',
  left: 'left-0',
};

const menu = ref<HTMLInputElement | null>(null);
const showMenu = ref(false);

const api = (emit, props) => {
  onClickOutside(menu, (e) => (showMenu.value = false));

  const computedClasses = computed(() => {
    return [origins[props.origin], positions[props.position]];
  });

  watch(
    () => props.value,
    (val) => {
      showMenu.value = val;
    },
    { immediate: true },
  );

  watch(
    () => showMenu.value,
    (val) => {
      emit('update:value', val);
    },
  );

  return { computedClasses, menu, showMenu };
};

export { api, Origin, Position };
