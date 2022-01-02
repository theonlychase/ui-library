import { inject, ref, Ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { Controls, PageMeta } from '@/types/global';

const defaultControlState = ref({});

const setDefaultControls = ({
  controls,
  disabled = false,
  title = '',
  description = '',
}: {
  controls: Controls;
  disabled?: boolean;
  title?: string;
  description?: string;
}) => {
  const controlState = inject('controlState') as Ref;

  Object.keys(controls).forEach((key) => {
    controls[key].props.disabled = disabled;
  });

  controlState.value = { ...controls };

  const defaultProps = {};

  Object.entries(controls).forEach(([key, value]): void => {
    defaultProps[`${key}`] = value.props.value;
  });

  setPageMeta({ title, description });

  onBeforeRouteLeave((to, from) => {
    controlState.value = null;
  });

  return defaultProps;
};

const setPageMeta = ({ title, description }: PageMeta) => {
  const pageMeta = inject('pageMeta');
  Object.assign(pageMeta, { title, description });
};

const mockOptions = [
  { name: 'Usa', id: 'usa' },
  { name: 'Mexico', id: 'mexico' },
  { name: 'Spain', id: 'spain' },
  { name: 'Brazil', id: 'brazil' },
  { name: 'Germany', id: 'germany' },
  { name: 'Turkey', id: 'turkey' },
  { name: 'Egypt', id: 'egypt' },
  { name: 'Iran', id: 'iran' },
  { name: 'Russia', id: 'russia' },
  { name: 'Romania', id: 'romania' },
  { name: 'Canada', id: 'canada' },
];

export { defaultControlState, mockOptions, setDefaultControls };
