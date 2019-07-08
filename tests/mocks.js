export class MockedVuexStore {
  constructor(state, mutations, actions) {
    this.state = state
    this.mutations = {
      ...mutations
    }
    this.actions = {
      ...actions
    }
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
          commit: (type, payload) => this.commit(type, payload)
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