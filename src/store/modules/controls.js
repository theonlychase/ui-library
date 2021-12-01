const getDefaultState = () => {
  return {
    controls: null,
  };
};

export default {
  namespaced: true,
  state: () => ({
    ...getDefaultState(),
  }),
  mutations: {
    setControls(state, payload) {
      state.controls = payload;
    },
  },
  getters: {
    getControls(state) {
      return state.controls;
    },
  },
  actions: {
    setControls({ commit }, payload) {
      commit('setControls', payload);
    },
  },
};
