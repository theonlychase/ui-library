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

export { setDefaultControls };
