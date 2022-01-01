export default {
  autocomplete: {
    name: 'autocomplete',
    type: '',
    props: {
      value: false,
    },
    description: 'Listbox will become a searchable autocomplete.',
  },
  disabled: {
    name: 'disabled',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Listbox will be disabled',
  },
  inputProps: {
    name: 'inputProps',
    type: '',
    props: {
      value: null,
    },
    description:
      '<div>When <strong>autocomplete = true</strong>, Pass any WcInput prop to customize the input.</div><div>See WcInput for available props</div>',
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
      value: [],
    },
    description:
      '<div>Array of Strings/Objects.</div><div>Object must contain both id and name properties.</div>',
  },
  placeholder: {
    name: 'placeholder',
    type: 'text',
    props: {
      value: 'Select an option...',
    },
    description: 'Listbox Placeholder',
  },
  search: {
    name: 'search',
    type: '',
    props: {
      value: '',
      placeholder: '',
      disabled: true,
    },
    description:
      '<div>Bound model for search input.</div><div>autocomplete prop required.</div>',
  },
  value: {
    name: 'value',
    type: '',
    props: {
      value: '',
      disabled: true,
    },
    description:
      '<div>Bound model for selected listbox item.</div><div>String/Object</div><div>Object must contain both id and name properties.</div>',
  },
};
