const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
});

const isObject = (value) => {
  return value !== null && typeof value === 'object';
};

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

export { isObject, keyCodes, setDefaultControls };
