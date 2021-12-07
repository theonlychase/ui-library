import { computed, defineAsyncComponent, ref, watch, watchEffect } from 'vue';

const components = {
  WcSelect: defineAsyncComponent(() =>
    import('@/components/ui/WcSelect/WcSelect.vue'),
  ),
  WcInput: defineAsyncComponent(() =>
    import('@/components/ui/WcInput/WcInput.vue'),
  ),
  WcToggle: defineAsyncComponent(() =>
    import('@/components/ui/WcToggle/WcToggle.vue'),
  ),
};

const resizePanel = (panel) => {
  const resizing = ref(false);
  const height = ref('auto');

  watchEffect(
    () => {
      panel.value.firstElementChild.onmousedown = (e) => {
        e.preventDefault();
        resizing.value = true;
      };

      document.onmousemove = (e) => {
        if (!resizing.value) {
          return;
        }
        height.value =
          panel.value.clientHeight - (e.clientY - panel.value.offsetTop);
      };

      document.onmouseup = () => {
        resizing.value = false;
      };
    },
    {
      flush: 'post',
    },
  );

  return { resizing, height };
};

const setComponents = (type) => {
  return type === 'select'
    ? components.WcSelect
    : type === 'text'
    ? components.WcInput
    : components.WcToggle;
};

const setControls = (route, store) => {
  const controlsState = computed(() => store.state.controls.controls);

  watch(
    () => controlsState.value,
    (val) => {
      if (val) {
        Object.entries(route.query).forEach(([key, value]) => {
          controlsState.value[`${key}`].props.value =
            value === 'true' ? true : value === 'false' ? false : value;
        });
      }
    },
    { immediate: true },
  );

  return controlsState;
};

const tabs = [
  { id: 'controls', title: 'Controls' },
  // { id: 'documentation', title: 'Documentation' },
];

const panelHeaders = ['Name', 'Description', 'Control'];

const updateQuery = ({ val, name }, store, route, router, controlsState) => {
  controlsState[`${name}`].props.value = val;
  store.dispatch('controls/setControls', controlsState);

  router.push({
    name: route.name,
    query: {
      ...route.query,
      [`${name}`]: val,
    },
  });
};

export {
  panelHeaders,
  resizePanel,
  setControls,
  setComponents,
  tabs,
  updateQuery,
};
