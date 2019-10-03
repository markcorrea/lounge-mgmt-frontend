import React, { Fragment, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import socketIOClient from 'socket.io-client'
import 'react-toastify/dist/ReactToastify.css'

const server = process.env.API_SOCKET

const Socket = () => {

  const notify = order => {
    toast(
      <div>
        <b>Mesa: {order.client}</b><br />
        <i>{order.name}</i>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        draggablePercent: 40,
      }
    )
    var audio = new Audio(sound)
    audio.play()
  }

  useEffect(() => {
    let socket = socketIOClient(`${server}`)
    socket.on('orderReady', order => {
      notify(order)
    })

    return function cleanup() {
      socket.close()
    }
  }, [])

  return <div />
}

export default Socket
