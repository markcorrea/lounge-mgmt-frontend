import axios from 'axios'
import { products } from '@services/mocks'
import { verifyToken, showMessage, verifyResponseMessage } from '@utilities'
const server = process.env.API_URL

const searchProducts = body => {
  return axios
    .post(`${server}/products/search`, body, {
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

const getProducts = () => {
  return axios
    .get(`${server}/products`, {
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

const getProduct = productId => {
  return axios
    .get(`${server}/products/${productId}`, {
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

const saveProduct = body => {
  return axios
    .post(`${server}/products`, body, {
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

const updateProduct = body => {
  return axios
    .put(`${server}/products/${body._id}`, body, {
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

const deleteProduct = _id => {
  return axios
    .delete(`${server}/products/${_id}`, {
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

const payProducts = body => {
  return axios
    .post(`${server}/products/pay`, body, {
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

const payProductsOnCashier = body => {
  return axios
    .post(`${server}/products/pay/cashier`, body, {
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

const removeProducts = body => {
  return axios
    .post(`${server}/products/remove`, body, {
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
const mockSearchProducts = term => {
  const matchSearch = field =>
    field
      .toString()
      .toLowerCase()
      .search(term.toLowerCase()) != '-1'

  return products.filter(product => {
    return (
      matchSearch(product.name) ||
      matchSearch(product.quantity) ||
      matchSearch(product.terminal) ||
      matchSearch(product.price)
    )
  })
}

export default {
  searchProducts,
  getProducts,
  getProduct,
  deleteProduct,
  saveProduct,
  updateProduct,
  payProducts,
  removeProducts,
  mockSearchProducts,
  payProductsOnCashier
}
