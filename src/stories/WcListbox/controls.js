export default {
  // disabled: {
  //   name: 'disabled',
  //   type: 'toggle',
  //   props: {
  //     value: false,
  //   },
  //   description: 'Select Menu will be disabled',
  // },
  iconRight: {
    name: 'iconRight',
    type: 'select',
    props: {
      value: 'selector',
      options: ['selector', 'chevronDown', 'chevronUp'],
    },
    description: 'Listbox Right Icon',
  },
  label: {
    name: 'label',
    type: 'text',
    props: {
      value: 'Label',
    },
    description: 'List Box Label',
  },
  options: {
    name: 'options',
    type: '',
    props: {
      value: '"Option 1" or { id: "option-1", name: "Option 1" }',
    },
    description:
      'List Box Options. Can be a String/Object. Object must contain both id and name properties.',
  },
  placeholder: {
    name: 'placeholder',
    type: 'text',
    props: {
      value: 'Select an option...',
    },
    description: 'Select Menu Placeholder',
  },
};
