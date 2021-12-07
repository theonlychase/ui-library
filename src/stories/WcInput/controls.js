export default {
  disabled: {
    name: 'disabled',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Disabled State',
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
      'Variations of Input Styling. labelInset, labelOverlap, pill, solid, and underline',
  },
};
