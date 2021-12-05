const setDefaultControls = (controls, useStore) => {
  const store = useStore();
  store.dispatch('controls/setControls', controls);

  const defaultProps = {};

  Object.entries(controls).forEach(([key, value]) => {
    defaultProps[`${key}`] = value.props.value;
  });

  return defaultProps;
};

export { setDefaultControls };
