import axios from 'axios'

const API_ROOT = 'https://fierce-reaches-50430.herokuapp.com/'
// const API_ROOT = 'http://localhost:5000'

const instance = axios.create({
  baseURL: API_ROOT,
})

export default instance