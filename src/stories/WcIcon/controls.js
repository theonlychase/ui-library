import { iconNames } from '@/components/ui/WcIcon/icons';

export default {
  size: {
    name: 'size',
    type: 'select',
    props: {
      value: 'medium',
      options: ['xxSmall', 'xSmall', 'small', 'medium', 'large', 'xLarge'],
    },
    description:
      'Valid Icon sizes: xxSmall, xSmall, small, medium, large, xLarge',
  },
  name: {
    name: 'name',
    type: 'select',
    props: {
      value: 'templateOutline',
      options: iconNames,
    },
    description: 'Valid icon name',
  },
  color: {
    name: 'color',
    type: 'select',
    props: {
      value: 'blue500',
      options: ['blue500', 'gray500', 'green500', 'orange500', 'red500'],
    },
    description: 'Valid color name for icon color',
  },
  hoverColor: {
    name: 'hoverColor',
    type: 'select',
    props: {
      value: 'blue600',
      options: ['blue600', 'gray600', 'green600', 'orange600', 'red600'],
    },
    description: 'Valid color name for icon hover color',
  },
};
