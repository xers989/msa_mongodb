import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    email: sessionStorage.getItem("email")
  },
  mutations: {
    signInState(state, data) {
        state.email = data.email;

        sessionStorage.setItem("email", data.email);
    }
  }
})