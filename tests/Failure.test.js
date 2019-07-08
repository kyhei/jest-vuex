import store from '../store'

describe('Test your Vuex module', () => {
  /**
   * state = {
   *  items: []
   * }
   */

  test('itemsでstate.itemsを初期化', () => {
    const items = [
      { id: 1, name: 'hoge' }
    ]
    store.commit('models/User/setItems', items)
    expect(store.state.models.User.items).toEqual(items)
  })

  test('state.itemに要素を追加', () => {
    const item = { id: 1, name: 'hoge' }
    store.commit('models/User/addItem', item)
    expect(store.state.models.User.items.length).toBe(1)
  })
})