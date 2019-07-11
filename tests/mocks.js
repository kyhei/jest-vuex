export class MockedVuexStore {
  constructor({ state, getters, mutations, actions }) {
    this.state = state

    this.getters = {}
    for (let getterName in getters) {
      this.getters[getterName] = getters[getterName](this.state, this.getters)
    }

    this.mutations = mutations
    this.actions = actions
  }

  commit(type, payload = null) {
    try {

      this.mutations[type](this.state, payload)

    } catch (e) {
      if (!e instanceof TypeError) {
        throw e
      }
      console.log(`unknown mutation "${type}" is called`)
    }
  }

  dispatch(type, payload = null) {
    try {
      return this.actions[type](
        {
          state: this.state,
          getters: this.getters,
          commit: (type, payload) => this.commit(type, payload),
          dispatch: (type, payload) => this.dispatch(type, payload)
        },
        payload
      )
    } catch (e) {
      if (!e instanceof TypeError) {
        throw e
      }
      console.log(`unknown action "${type}" is called`)
    }
  }
}