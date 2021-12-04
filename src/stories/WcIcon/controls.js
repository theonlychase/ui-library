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
        'menuAlt2Stroke',
        'templateOutline',
      ],
    },
  },
  color: {
    name: 'color',
    type: 'text',
    props: {
      value: 'black',
    },
  },
};
