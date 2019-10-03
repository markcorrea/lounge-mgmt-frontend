import axios from 'axios'
import { verifyToken, verifyResponseMessage } from '@utilities'
const server = process.env.API_URL

const login = body => {
  return axios
    .post(`${server}/users/login`, body)
    .then(response => {
      const token = response.data.token
      document.cookie = `token=${token}`
      verifyResponseMessage(response)
      return true
    })
    .catch(() => {
      return false
    })
}

export default { login }
