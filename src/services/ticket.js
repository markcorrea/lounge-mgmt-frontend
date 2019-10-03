import axios from 'axios'
import { verifyToken, verifyResponseMessage } from '@utilities'
const server = process.env.API_URL

const getTickets = () => {
  return axios
    .get(`${server}/tickets`, {
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

const saveTicket = body => {
  return axios
    .post(`${server}/tickets`, body, {
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

const changeTicketTable = ({ prevTable, nextTable }) => {
  return axios
    .post(
      `${server}/tickets/move/${prevTable}`,
      { uniqueNumber: nextTable },
      {
        headers: {
          token: verifyToken(),
        },
      }
    )
    .then(response => {
      verifyResponseMessage(response)
      return response
    })
    .catch(error => {
      console.log('erro', error.response.status)
      return error
    })
}

const getTicketByUniqueNumber = uniqueNumber => {
  return axios
    .get(`${server}/tickets/${uniqueNumber}`, {
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

const getTicketDetailsByUniqueNumber = uniqueNumber => {
  return axios
    .get(`${server}/tickets/details/${uniqueNumber}`, {
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

const addProductToTicket = body => {
  return axios
    .post(`${server}/tickets/product`, body, {
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
      return false
    })
}

const closeTicket = body => {
  return axios
    .post(`${server}/tickets/close/${body.ticketId}`, body, {
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
      return false
    })
}

const registerCredit = body => {
  return axios
    .post(`${server}/tickets/pay/${body.ticketId}`, body, {
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
      return false
    })
}

export default {
  getTickets,
  saveTicket,
  changeTicketTable,
  getTicketByUniqueNumber,
  getTicketDetailsByUniqueNumber,
  addProductToTicket,
  closeTicket,
  registerCredit,
}
