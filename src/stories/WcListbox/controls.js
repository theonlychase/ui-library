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
      value:
        '<div>String: Option 1</div> <div>Object: { id: "option-1", name: "Option 1" }</div>',
    },
    description:
      '<div>Can be a String/Object.</div><div>Object must contain both id and name properties.</div>',
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
