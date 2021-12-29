import { InputValueProps } from '@/types/global';

const filterDuplicates = (options: Array<InputValueProps>) => {
  const uniqueValues = new Map();

  options.forEach((value) => {
    const id = getValueId(value);

    !uniqueValues.has(id) && uniqueValues.set(id, value);
  });

  return Array.from(uniqueValues.values());
};

const getValueId = (value): string => {
  return isObject(value) ? value.id : value;
};

const getValueName = (value): string => {
  return isObject(value) ? value.name : value;
};

const isObject = (value): boolean => {
  return value !== null && typeof value === 'object';
};

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

export { filterDuplicates, getValueId, getValueName, isObject, keyCodes };
