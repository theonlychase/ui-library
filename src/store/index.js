import { createStore } from 'vuex';
import controls from './modules/controls';

function loadModules() {
  const context = import.meta.globEager('./modules/*.js');

  const modules = {};

  Object.keys(context).forEach((key) => {
    if (key === './index.js') return;
    modules[key.replace(/(\.\/|\.js)/g, '')] = context[key].default;
  });

  return { context, modules };
}

export const { context, modules } = loadModules();

const store = createStore({
  modules: {
    controls,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(Object.keys(context), () => {
    const { modules } = loadModules();
    store.hotUpdate({
      modules,
    });
  });
}

export default store;
