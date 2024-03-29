export default {
  block: {
    name: 'block',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Button will expand to 100% width of container',
  },
  circle: {
    name: 'circle',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Button will be a circle',
  },
  disabled: {
    name: 'disabled',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Button will be disabled',
  },
  iconLeft: {
    name: 'iconLeft',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Button icon-left slot',
  },
  iconRight: {
    name: 'iconRight',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Button icon-right slot',
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
      'Button sizes are <span class="font-bold">xSmall, small, medium, or large</span>',
  },
  variation: {
    name: 'variation',
    type: 'select',
    props: {
      value: 'primary',
      options: ['primary', 'secondary', 'white', 'text', 'error'],
    },
    description:
      'Button variations are: <span class="font-bold">primary, secondary, white, text, error</span>',
  },
};
