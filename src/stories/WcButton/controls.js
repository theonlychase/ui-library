export default {
  block: {
    name: 'block',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Button will expand to 100% width of container',
  },
  disabled: {
    name: 'disabled',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Button will be disabled',
  },
  rounded: {
    name: 'rounded',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Button will become rounded',
  },
  size: {
    name: 'size',
    type: 'select',
    props: {
      value: 'medium',
      options: [
        { id: 'xSmall', name: 'xSmall' },
        { id: 'small', name: 'small' },
        { id: 'medium', name: 'medium' },
        { id: 'large', name: 'large' },
      ],
    },
    description:
      'Button will become either "xSmall", "small," "medium", or "large"',
  },
  variation: {
    name: 'variation',
    type: 'select',
    props: {
      value: 'primary',
      // options: [
      //   { id: 'primary', name: 'primary' },
      //   { id: 'secondary', name: 'secondary' },
      //   { id: 'text', name: 'text' },
      // ],
      options: ['primary', 'secondary', 'text'],
    },
    description:
      'Button will become become either "primary", "secondary", or "text"',
  },
};
