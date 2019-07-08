import $axios from '../store/HttpClient'
import { mutations, actions } from '../store/Models/User'
import { MockedVuexStore } from './mocks'

jest.mock('../store/HttpClient')

describe('Test AdminUser mutations', () => {
  test('set items', () => {

    const state = {
      items: []
    }

    const items = [
      {
        id: 1,
        name: 'hoge',
        email: 'hoge@hoge.com'
      },
      {
        id: 2,
        name: 'fuga',
        email: 'fuga@fuga.com'
      }
    ]

    const store = new MockedVuexStore(state, mutations, actions)
    store.commit('setItems', items)
    expect(store.state.items).toEqual(items)
  })

  test('add item', () => {
    const state = {
      items: []
    }

    const item = {
      id: 1,
      name: 'hoge',
      email: 'hoge@hoge.com'
    }

    const store = new MockedVuexStore(state, mutations, actions)
    store.commit('addItem', item)
    expect(store.state.items).toEqual([item])

  })

  test('update items', () => {
    const state = {
      items: []
    }

    const items = [
      {
        id: 1,
        name: 'hoge',
        email: 'hoge@hoge.com'
      },
      {
        id: 2,
        name: 'fuga',
        email: 'fuga@fuga.com'
      }
    ]

    const store = new MockedVuexStore(state, mutations, actions)

    store.commit('setItems', items)
    store.commit('updateItem', {
      id: 2,
      name: 'moja',
      email: 'moja@moja.com'
    })

    expect(store.state.items[1]).toEqual({
      id: 2,
      name: 'moja',
      email: 'moja@moja.com'
    })
  })

  test('delete item', () => {
    const state = {
      items: []
    }

    const items = [
      {
        id: 1,
        name: 'hoge',
        email: 'hoge@hoge.com'
      },
      {
        id: 2,
        name: 'fuga',
        email: 'fuga@fuga.com'
      }
    ]

    const store = new MockedVuexStore(state, mutations, actions)
    store.commit('setItems', items)
    store.commit('deleteItem', 2)

    expect(store.state.items).toEqual([
      {
        id: 1,
        name: 'hoge',
        email: 'hoge@hoge.com'
      }
    ])
  })

})

describe('Test AdminUser actions', () => {

  test('fetch action', () => {

    const state = {
      items: []
    }

    const items = [
      {
        id: 1,
        name: 'hoge',
        email: 'hoge@hoge.com'
      },
      {
        id: 2,
        name: 'fuga',
        email: 'fuga@fuga.com'
      }
    ]

    const resp = {
      data: items,
      status: 200
    }

    $axios.get.mockResolvedValue(resp)

    const store = new MockedVuexStore(state, mutations, actions)

    store.dispatch('fetch').then(res => {
      expect(store.state.items).toEqual(items)
    })

  })

  test('add action', () => {
    const state = {
      items: []
    }

    const item = {
      id: 1,
      name: 'hoge',
      email: 'hoge@hoge.com'
    }

    const resp = {
      data: item,
      status: 200
    }

    $axios.post.mockResolvedValue(resp)

    const store = new MockedVuexStore(state, mutations, actions)

    store.dispatch('add', item).then(res => {
      expect(store.state.items).toEqual([item])
    })
  })

  test('edit action', () => {
    const state = {
      items: [
        {
          id: 1,
          name: 'hoge',
          email: 'hoge@hoge.com'
        }
      ]
    }

    const edited = {
      id: 1,
      name: 'fuga',
      email: 'fuga@fuga.com'
    }

    const resp = {
      data: edited,
      status: 200
    }

    $axios.post.mockResolvedValue(resp)

    const store = new MockedVuexStore(state, mutations, actions)

    store.dispatch('edit', edited).then(res => {
      expect(store.state.items[0]).toEqual(edited)
    })
  })

  test('delete action', () => {
    const state = {
      items: [
        {
          id: 1,
          name: 'hoge',
          email: 'hoge@hoge.com'
        },
        {
          id: 2,
          name: 'fuga',
          email: 'fuga@fuga.com'
        }
      ]
    }

    const resp = {
      data: { result: 'ok' },
      status: 200
    }

    $axios.delete.mockResolvedValue(resp)

    const store = new MockedVuexStore(state, mutations, actions)

    store.dispatch('delete', 1).then(res => {
      expect(store.state.items.length).toBe(1)
      expect(store.state.items[0].id).toBe(2)
    })
  })
})