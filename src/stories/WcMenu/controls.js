export default {
  origin: {
    name: 'origin',
    type: 'select',
    props: {
      value: 'right',
      options: ['right', 'top', 'left'],
    },
    description: 'Menu top transform origin when toggled',
  },
  position: {
    name: 'position',
    type: 'select',
    props: {
      value: 'left',
      options: ['right', 'left'],
    },
    description: 'Menu horizontal position relative to its activator/parent',
  },
};
