import { iconNames } from '@/components/ui/WcIcon/icons';

export default {
  size: {
    name: 'size',
    type: 'select',
    props: {
      value: 'medium',
      options: ['xxSmall', 'xSmall', 'small', 'medium', 'large', 'xLarge'],
    },
    description: 'Icon sizes are: <span class="font-bold">xxSmall, xSmall, small, medium, large, xLarge</span>',
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
      value: 'text-blue-500 hover:text-blue-600',
      options: [
        'text-blue-500 hover:text-blue-600',
        'text-gray-500 hover:text-gray-600',
        'text-green-500 hover:text-green-600',
        'text-orange-500 hover:text-orange-600',
        'text-red-500 hover:text-red-600',
      ],
    },
    description: 'Valid color name for icon color',
  },
};
