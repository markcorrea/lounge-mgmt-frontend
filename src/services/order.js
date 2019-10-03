import axios from 'axios'
import { verifyToken, verifyResponseMessage } from '@utilities'
const server = process.env.API_URL

const getOrders = body => {
  return axios
    .get(`${server}/orders`, {
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

export default {
  getOrders
}
