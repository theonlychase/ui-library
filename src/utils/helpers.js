const setDefaultControls = (controls, useStore, disabled = false) => {
  const store = useStore();

  Object.keys(controls).forEach((key) => {
    controls[key].props.disabled = disabled;
  });

  store.dispatch('controls/setControls', controls);

  const defaultProps = {};

  Object.entries(controls).forEach(([key, value]) => {
    defaultProps[`${key}`] = value.props.value;
  });

  return defaultProps;
};

const isObject = (value) => {
  return value !== null && typeof value === 'object';
};

export { isObject, setDefaultControls };
