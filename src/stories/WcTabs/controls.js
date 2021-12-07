export default {
  grow: {
    name: 'grow',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Each Tab Header will expand to 100% width',
  },
  contentPadding: {
    name: 'contentPadding',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Tab Content will have 1.5rem of padding',
  },
  overflowContent: {
    name: 'overflowContent',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Tab Content will be scrollable',
  },
  size: {
    name: 'size',
    type: 'select',
    props: {
      value: 'medium',
      options: ['medium', 'small'],
    },
    description: 'Tab will be either medium or small',
  },
  vertical: {
    name: 'vertical',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Tabs will be vertically aligned',
  },
};
