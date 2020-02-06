import Vue from 'vue';
import Vuex from 'vuex';
import route from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    valueToCheck: '',
  },
  mutations: {
    CHANGE_VALUE(state, value) {
      state.valueToCheck = value;
    },
  },
  actions: {
    changeValueToCheck({ commit }, value) {
      commit('CHANGE_VALUE', value);
      route.push('/narcissistic');
    },
  },
  modules: {
  },
});
