const accordionControls = {
  single: {
    name: 'single',
    type: 'toggle',
    props: {
      value: false,
    },
    description: 'Single or multiple accordion Items open at a time.',
  },
  size: {
    name: 'size',
    type: 'select',
    props: {
      value: 'medium',
      options: ['xSmall', 'small', 'medium', 'large'],
    },
    description: 'Accordion Item Sizes (Same as WcButton Sizes for now)',
  },
};

const itemControls = {
  open: {
    name: 'open',
    type: '',
    props: {
      value: false,
    },
    description: 'AccordionItem will be opened by default',
  },
};

export { accordionControls, itemControls };
