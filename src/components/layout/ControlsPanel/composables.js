import { defineAsyncComponent, ref, watch, watchEffect } from 'vue';

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
  const height = ref('400');

  watchEffect(
    () => {
      panel.value.firstElementChild.onmousedown = () => {
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
    : type === 'toggle'
    ? components.WcToggle
    : null;
};

const setControls = (controlsState) => {
  let headers = ref([]);

  watch(
    () => controlsState.value,
    (val) => {
      if (val) {
        const isDisabled = Object.keys(val).every((key) => {
          return controlsState.value[key].props.disabled;
        });
        headers.value = panelHeaders(isDisabled);
      }
    },
    { deep: true, immediate: true },
  );

  return { controlsState, headers };
};

const tabs = ['Controls'];

const panelHeaders = (disabledState) => {
  return ['Name', 'Description', `Control${disabledState ? 's Disabled' : ''}`];
};

const updateQuery = ({ val, name }, route, router, controlsState) => {
  controlsState[`${name}`].props.value = val;

  router.push({
    name: route.name,
    query: {
      ...route.query,
      [`${name}`]: val,
    },
  });
};

export { resizePanel, setControls, setComponents, tabs, updateQuery };
