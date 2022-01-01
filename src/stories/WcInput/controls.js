export default {
  clearable: {
    name: 'clearable',
    type: 'toggle',
    props: {
      value: true,
    },
    description: 'Clear input value when right icon is clicked',
  },
  customClasses: {
    name: 'customClasses',
    type: 'text',
    props: {
      value: '',
    },
    description: 'Custom Class for Component',
  },
  disabled: {
    name: 'disabled',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Disabled State',
  },
  error: {
    name: 'error',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Error State',
  },
  errorMessage: {
    name: 'errorMessage',
    type: 'text',
    props: {
      value: '',
    },
    description: 'Error Message. Error must be true to show.',
  },
  hint: {
    name: 'hint',
    type: 'text',
    props: {
      value: 'This is a hint for the input',
    },
    description: 'Hint message. Shows when no error.',
  },
  iconLeft: {
    name: 'iconLeft',
    type: 'select',
    props: {
      value: 'mail',
      options: [
        'chevronRight',
        'closeOutlineStroke',
        'mail',
        'menuAlt2Stroke',
        'questionMarkCircle',
        'templateOutline',
        '',
      ],
    },
    description: 'Icon displayed on the left side of the input',
  },
  iconRight: {
    name: 'iconRight',
    type: 'select',
    props: {
      value: 'questionMarkCircle',
      options: [
        'chevronRight',
        'closeOutlineStroke',
        'mail',
        'menuAlt2Stroke',
        'questionMarkCircle',
        'templateOutline',
        '',
      ],
    },
    description: 'Icon displayed on the right side of the input',
  },
  label: {
    name: 'label',
    type: 'text',
    props: {
      value: 'Label',
    },
    description: 'Text Field Label, for accessibility',
  },
  loading: {
    name: 'loading',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Loading Spinner',
  },
  placeholder: {
    name: 'placeholder',
    type: 'text',
    props: {
      value: 'Placeholder',
    },
    description: 'Placeholder text when no value',
  },
  variation: {
    name: 'variation',
    type: 'select',
    props: {
      value: 'solid',
      options: ['labelInset', 'labelOverlap', 'pill', 'solid', 'underline'],
    },
    description:
      'Input variations: <span class="font-bold">labelInset, labelOverlap, pill, solid, underline</span>',
  },
};
