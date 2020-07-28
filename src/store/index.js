import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // path: [{
    //   title: "首页",
    //   path: "/"
    // },],
    path: []
  },
  mutations: {
    addpath(state, val) {
      state.path.push(val)
      for (var i = 0; i < state.path.length; i++) {
        for (var j = i + 1; j < state.path.length; j++) {
          if (state.path[i].title == state.path[j].title)
            state.path.splice(j, 1)
        }
      }


    }
  },
  actions: {},
  modules: {}
});
