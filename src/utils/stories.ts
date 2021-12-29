import { inject } from 'vue';
import { useStore } from 'vuex';
import { PageMeta } from '@/types/global';

const setDefaultControls = ({
  controls,
  disabled = false,
  title = '',
  description = '',
}) => {
  const store = useStore();

  Object.keys(controls).forEach((key) => {
    controls[key].props.disabled = disabled;
  });

  store.dispatch('controls/setControls', controls);

  const defaultProps = {};

  Object.entries(controls).forEach(([key, value]) => {
    defaultProps[`${key}`] = value.props.value;
  });

  setPageMeta({ title, description });

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

export { mockOptions, setDefaultControls };
