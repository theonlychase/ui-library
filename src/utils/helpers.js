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

export { isObject, keyCodes };
