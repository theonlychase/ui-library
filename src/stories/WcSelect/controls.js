export default {
  disabled: {
    name: 'disabled',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Select Menu will be disabled',
  },
  label: {
    name: 'label',
    type: 'text',
    props: {
      value: 'Label',
    },
    description: 'Select Menu Label',
  },
  placeholder: {
    name: 'placeholder',
    type: 'text',
    props: {
      value: 'Placeholder',
    },
    description: 'Select Menu Placeholder',
  },
  value: {
    name: 'value',
    type: 'select',
    props: {
      value: 'Option 1',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    },
    description: 'default value',
  },
};
