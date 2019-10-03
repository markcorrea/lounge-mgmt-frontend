import axios from 'axios'
import { verifyToken, verifyResponseMessage } from '@utilities'

const server = process.env.API_URL

const getLoggedUser = () => {
  return axios
    .get(`${server}/users/me`, {
      headers: {
        token: verifyToken(),
      },
    })
    .then(response => {
      verifyResponseMessage(response)
      return response
    })
    .catch(error => {
      console.log('error', error)
      return error
    })
}

const logoutUser = () => {
  return axios
    .put(`${server}/users/logout`, {},
    {
      headers: {
        token: verifyToken(),
      },
    })
    .then(response => {
      verifyResponseMessage(response)
      return response
    })
    .catch(error => {
      console.log('error', error)
      return error
    })
}

export default { getLoggedUser, logoutUser }
