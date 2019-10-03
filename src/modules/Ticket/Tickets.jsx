import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import Card from '@ui/Card'
import Spinner from '@ui/Spinner'
import OrderReadySocket from '@ui/OrderReadySocket'

import { toCurrencyReal } from '@utilities'

import services from '@services'

const Ticket = () => {
  const notify = order => {
    toast(
      <div>
        {order.name} <br />
        Mesa: {order.client}
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

  const { getTickets } = services
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTickets = async () => {
    setLoading(true)
    const result = await getTickets()
    setLoading(false)
    setTickets(result.data.tickets)
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  return (
    <Fragment>
      <OrderReadySocket />

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <h1 className='h3 mb-30 text-gray-800'>Comandas</h1>
        </div>
        <div className='col-md-6 col-sm-12'>
          <Link
            to={`/main/new-ticket`}
            className='btn btn-primary btn-icon-split right-button'
          >
            <span
              style={{ padding: '0.575rem 0.75rem' }}
              className='icon text-white-50'
            >
              <i className='fas fa-plus' />
            </span>
            <span className='text'>Nova Comanda</span>
          </Link>
        </div>
      </div>

      <div className='row'>
        {tickets && tickets.length > 0 ? (
          tickets.map((ticket, index) => {
            return (
              <Card
                key={ticket._id}
                title={ticket.name || 'sem nome'}
                text={toCurrencyReal(ticket.totalPrice || 0)}
                uniqueNumber={ticket.uniqueNumber}
                linkTo={'/main/edit-ticket/' + ticket.uniqueNumber}
              />
            )
          })
        ) : loading ? (
          <Spinner />
        ) : (
          <div style={{ margin: '20px auto' }}>Não há comandas cadastradas</div>
        )}
      </div>
    </Fragment>
  )
}

export default Ticket
