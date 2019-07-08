import $axios from '../HttpClient'

const state = {
  items: []
}

const getters = {}

export const mutations = {
  setItems(state, data) {
    state.items = data
  },

  addItem(state, data) {
    state.items.push(data)
  },

  updateItem(state, data) {
    const index = state.items.findIndex(item => item.id == data.id)
    Object.assign(state.items[index], data)
  },

  deleteItem(state, id) {
    const index = state.items.findIndex(item => item.id == id)
    state.items.splice(index, 1)
  }
}

export const actions = {
  async fetch(context) {
    const response = await $axios.get('/api/users')
    context.commit('setItems', response.data)
    return 'OK'
  },

  async add(context, data) {
    const response = await $axios.post(`/api/users/add`, data)
    context.commit('addItem', response.data)
    return 'OK'
  },

  async edit(context, data) {
    const response = await $axios.post(`/api/users/${data.id}/edit`, data)
    context.commit('updateItem', response.data)
    return 'OK'
  },

  async delete(context, id) {
    await $axios.delete(`/api/users/${id}/delete`)
    context.commit('deleteItem', id)
    return false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}