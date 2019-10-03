import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import SideMenu from '@ui/SideMenu'
import TopMenu from '@ui/TopMenu'
import Tickets from '@modules/Ticket/Tickets'
import NewTicket from '@modules/Ticket/NewTicket'
import EditTicket from '@modules/Ticket/EditTicket'
import Products from '@modules/Product/Products'
import Product from '@modules/Product/Product'
import Cashiers from '@modules/Cashier/Cashiers'
import CashierTickets from '@modules/Cashier/CashierTickets'
import CashierTicket from '@modules/Cashier/CashierTicket'
import CashierBalance from '@modules/Cashier/CashierBalance'
import CashierSale from '@modules/Cashier/CashierSale'
import Terminals from '@modules/Terminal/Terminals'
import Terminal from '@modules/Terminal/Terminal'

import services from '@services'

const MainContainer = ({ match, history }) => {
  const [sideMenu, setSideMenu] = useState(true)
  const [menus, setMenus] = useState([])
  const [user, setUser] = useState(null)

  const { getLoggedUser, getMenus } = services

  const checkLoggedUser = async () => {
    const result = await getLoggedUser()
    if (result && result.data) {
      setUser(result.data.user)
      const menus = await getMenus()
      if (menus && menus.data) {
        setMenus(menus.data.menus)
        const firstMenu = menus.data.menus[0]
        history.push('/main/' + firstMenu.url)
      }
    } else {
      history.push('/')
    }
  }

  useEffect(() => {
    checkLoggedUser()
  }, [])

  toast.configure()

  const toggleSideMenu = () => {
    setSideMenu(!sideMenu)
  }

  return (
    <div id='wrapper'>
      <SideMenu hideMenu={sideMenu} match={match} menus={menus} />
      <div id='content-wrapper' className='d-flex flex-column'>
        <div id='content'>
          <TopMenu toggleSideMenu={toggleSideMenu} user={user} />
          <div className='container-fluid'>
            <Switch>
              <Route
                path={`${match.path}/tickets`}
                match={match}
                component={Tickets}
              />
              <Route path={`${match.path}/new-ticket`} component={NewTicket} />
              <Route
                path={`${match.path}/edit-ticket/:uniqueNumber`}
                match={match}
                component={EditTicket}
              />
              <Route
                path={`${match.path}/products`}
                match={match}
                component={Products}
              />
              <Route
                exact
                path={`${match.path}/product`}
                match={match}
                component={Product}
              />
              <Route
                exact
                path={`${match.path}/product/:id`}
                match={match}
                component={Product}
              />
              <Route
                exact
                path={`${match.path}/cashiers`}
                match={match}
                component={Cashiers}
              />
              <Route
                exact
                path={`${match.path}/cashier/:cashierId`}
                component={CashierTickets}
              />
              <Route
                exact
                path={`${match.path}/cashier/:cashierId/balance`}
                render={props => <CashierBalance {...props} userData={user} />}
              />
              <Route
                exact
                path={`${match.path}/cashier/:cashierId/ticket/:uniqueNumber`}
                component={CashierTicket}
              />
              <Route
                exact
                path={`${match.path}/cashier/:cashierId/sale`}
                component={CashierSale}
              />
              <Route
                exact
                path={`${match.path}/terminal`}
                component={Terminals}
              />
              <Route
                exact
                path={`${match.path}/terminal/:terminalId`}
                component={Terminal}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContainer
