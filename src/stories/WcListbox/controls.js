export default {
  disabled: {
    name: 'disabled',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Listbox will be disabled',
  },
  iconLeft: {
    name: 'iconLeft',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'ListboxButton icon-left slot',
  },
  iconRight: {
    name: 'iconRight',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'ListboxButton icon-right slot',
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
