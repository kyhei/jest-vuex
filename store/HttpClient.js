import axios from 'axios'

let baseURL = '/'
const $axios = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  baseURL: baseURL
})

export default $axios