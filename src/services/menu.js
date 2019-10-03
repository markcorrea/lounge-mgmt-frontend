import axios from 'axios'
import { verifyToken, verifyResponseMessage } from '@utilities'
const server = process.env.API_URL

const getMenus = () => {
  return axios
  .get(`${server}/menus`, {
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
  getMenus,
}
