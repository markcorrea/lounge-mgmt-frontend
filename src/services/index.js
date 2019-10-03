import client from '@services/client'
import login from '@services/login'
import product from '@services/product'
import terminal from '@services/terminal'
import ticket from '@services/ticket'
import user from '@services/user'
import cashier from '@services/cashier'
import order from '@services/order'
import menu from '@services/menu'


const functions  = {
  ...client,
  ...login,
  ...product,
  ...terminal,
  ...ticket,
  ...user,
  ...cashier,
  ...order,
  ...menu,
}

export default functions