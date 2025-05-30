import axios from 'axios'

const token = sessionStorage.getItem('token') || localStorage.getItem('token')

axios.defaults.headers = {
    Authorization: `Bearer ${token}`
}

const abortController = axios.CancelToken.source()

export { axios, abortController }