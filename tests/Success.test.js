import $axios from '../store/HttpClient'
import { getters, mutations, actions } from '../store/Models/User'
import { MockedVuexStore } from './mocks'

/* axiosをモック */
jest.mock('../store/HttpClient')

describe('Test your Vuex module', () => {

  test('mutationでstateを初期化', () => {
    const state = {
      items: []
    }

    const items = [
      { id: 1, name: 'hoge' }
    ]

    const store = new MockedVuexStore(state, getters, mutations, actions)
    store.commit('setItems', items)

    expect(store.state.items).toEqual(items)
  })

  test('非同期なactionで要素を追加', () => {
    const state = {
      items: []
    }

    const item = { id: 1, name: 'hoge' }

    /* axiosのメソッドをモック */
    $axios.post.mockResolvedValue({
      data: item,
      status: 200
    })

    const store = new MockedVuexStore(state, getters, mutations, actions)

    store.dispatch('add', item).then(res => {
      expect(store.state.items.length).toBe(1)
    })
  })
})