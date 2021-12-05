export default {
  size: {
    name: 'size',
    type: 'select',
    props: {
      value: 'medium',
      options: ['xxSmall', 'xSmall', 'small', 'medium', 'large', 'xLarge'],
    },
  },
  name: {
    name: 'name',
    type: 'select',
    props: {
      value: 'templateOutline',
      options: [
        'chevronRight',
        'closeOutlineStroke',
        'mail',
        'menuAlt2Stroke',
        'questionMarkCircle',
        'templateOutline',
      ],
    },
  },
  color: {
    name: 'color',
    type: 'select',
    props: {
      value: 'blue500',
      options: ['blue500', 'gray500', 'green500', 'orange500', 'red500'],
    },
  },
  hoverColor: {
    name: 'hoverColor',
    type: 'select',
    props: {
      value: 'blue600',
      options: ['blue600', 'gray600', 'green600', 'orange600', 'red600'],
    },
  },
};
