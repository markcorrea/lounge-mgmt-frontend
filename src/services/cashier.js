import axios from 'axios'
import { cashiers } from '@services/mocks'
import { verifyToken, showMessage, verifyResponseMessage } from '@utilities'
const server = process.env.API_URL

const getCashiers = () => {
  return axios
  .get(`${server}/cashiers`, {
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

const getCashier = cashierId => {
  return axios
  .get(`${server}/cashiers/${cashierId}`, {
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
// MOCK DATA
const deleteCashier = cashierId => {
  const index = cashiers.findIndex(cashier => cashier._id == cashierId)
  cashiers.splice(index, 1)
  return cashiers
}

const openCashier = body => {
  return axios
    .post(`${server}/cashiers`, body, {
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

const closeCashier = body => {
  return axios
    .post(`${server}/cashiers/close/${body._id}`, body, {
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

const payProduct = body => {
  return axios
    .post(`${server}/cashiers/${body.cashierID}/pay/${body.productId}`, {}, {
      headers: {
        token: verifyToken(),
      },
    })
    .then(response => {
      verifyResponseMessage(response)
      return response
    })
    .catch(error => {
      showMessage('Houve um erro ao efetuar o pagamento', 'error')
      console.log('erro', error.response.status)
      return false
    })
}

export default {
  getCashiers,
  getCashier,
  deleteCashier,
  openCashier,
  closeCashier,
  payProduct
}
