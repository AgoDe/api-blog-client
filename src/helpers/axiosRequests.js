import axios from 'axios'
import alertHelper from './alertHelper'

const host = import.meta.env.VITE_API_URL || '<<ENV_BASE_URL>>'
//axios.defaults.withCredentials = true
//axios.defaults.baseURL = import.meta.env.VITE_API_URL || '<<ENV_BASE_URL>>'

const instance = axios.create({
  baseURL: host,
  withCredentials: true
})

const handleError = (err) => {
  if (err.response?.status == 422) {
    alertHelper.redirectAlert(
      'error',
      'session_expired.title',
      'session_expired.message',
      'session_expired.button',
      'login'
    )
  } else {
    alertHelper.redirectAlert(
      'error',
      'server_error.title',
      'server_error.message',
      'server_error.button',
      'login'
    )
  }
}

const fetch = (path) => {
  
      return new Promise((resolve, reject) => {
        instance
        .get(path)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
        handleError(err)
      })
  })
}

const post = (path, data) => {
  return new Promise((resolve, reject) => {
    instance.post(path, data)
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reject(err)
      handleError(err)
    })
  })
}

const login = (data) => {
  return new Promise((resolve, reject) => {
    instance.post('login', data)
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      if (err.response?.status == 422) {
        alertHelper.simpleAlert('error', 'login.failed', 'login.failed_text')
      } else {
        alertHelper.redirectAlert(
          'error',
          'server_error.title',
          'server_error.message',
          'server_error.button',
          'login'
        )
      }
    })
  })
}

export default {
  fetch,
  post,
  login

}
