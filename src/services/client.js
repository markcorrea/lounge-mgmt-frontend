import axios from 'axios'
import { verifyToken, verifyResponseMessage } from '@utilities'
const server = process.env.API_URL

const addClient = body => {
  return axios
    .post(`${server}/clients`, body, {
      headers: {
        token: verifyToken(),
      },
    })
    .then(response => {
      verifyResponseMessage(response)
      return response
    })
    .catch(error => {
      console.log('erro', error.response.status)
      return error
    })
}

const searchClients = body => {
  return axios
    .post(`${server}/clients/search`, body, {
      headers: {
        token: verifyToken(),
      },
    })
    .then(response => {
      verifyResponseMessage(response)
      return response
    })
    .catch(error => {
      console.log('erro', error.response.status)
      return error
    })
}

const addClientToTicket = body => {
  return axios
    .post(`${server}/tickets/client`, body, {
      headers: {
        token: verifyToken(),
      },
    })
    .then(response => {
      verifyResponseMessage(response)
      return response
    })
    .catch(error => {
      console.log('erro', error.response.status)
      return error
    })
}

export default { addClient, searchClients, addClientToTicket }
