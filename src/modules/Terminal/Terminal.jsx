import React, { Fragment, useState, useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views'

import TerminalCard from '@ui/TerminalCard'

import services from '@services'
import sound from '../../media/sound/buzz.mp3'

import socketIOClient from 'socket.io-client'

const server = process.env.API_SOCKET

const Terminal = ({ match: { params } }) => {
  const terminalId = params.terminalId || null

  const { getOrdersByTerminal, getTerminal, setReadyOrder } = services
  const [orders, setOrders] = useState([])
  const [terminalName, setTerminalName] = useState('')

  useEffect(() => {
    fetchTerminal()
    fetchOrders()
    let socket = socketIOClient(`${server}`)
    socket.on(terminalId, () => {
      var audio = new Audio(sound)
      audio.play()
      fetchOrders()
    })

    return function cleanup() {
      socket.close()
    }
  }, [])

  const fetchOrders = async () => {
    let result = await getOrdersByTerminal(terminalId)
    setOrders([...result.data.orders])
  }

  const fetchTerminal = async () => {
    let result = await getTerminal(terminalId)
    setTerminalName(result.data.terminal.name)
  }

  const confirmOrder = async order => {
    await setReadyOrder(order)
    fetchOrders()
  }

  const OrderList = () => {
    return orders.map((order, orderIndex) => {
      return (
        <SwipeableViews
          key={'order' + orderIndex}
          index={1}
          onChangeIndex={() => confirmOrder(order)}
          enableMouseEvents
        >
          <div className='col-xl-4 col-md-6 mb-4' />
          <TerminalCard
            title={order.name || 'sem nome'}
            uniqueNumber={order.client}
          />
        </SwipeableViews>
      )
    })
  }

  return (
    <Fragment>
      <h1 className='h3 mb-2 text-gray-800'>Terminal: {terminalName}</h1>
      {orders && orders.length > 0 ? <OrderList /> : <div>There are no pending orders.</div>}
    </Fragment>
  )
}

export default Terminal
