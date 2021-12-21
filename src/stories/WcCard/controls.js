export default {
  block: {
    name: 'block',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Card will expand to 100% width of container',
  },
  borderless: {
    name: 'borderless',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Card will have no outside border',
  },
  footerSlot: {
    name: 'footerSlot',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Card footer content slot',
  },
  headerSlot: {
    name: 'headerSlot',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Card header content slot',
  },
  mediaSlot: {
    name: 'mediaSlot',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Card media slot',
  },
};
