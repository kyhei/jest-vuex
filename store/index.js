import Vue from 'vue'
import Vuex from 'vuex'
import models from './Models'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    models: {
      namespaced: true,
      modules: {
        ...models
      }
    }
  }
})

export default store