import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import DataTable from '@ui/DataTable'

import services from '@services'
import { toCurrencyReal } from '@utilities'

const CashierTickets = ({ match: { params }, history }) => {
  const { getTickets, getCashier } = services

  let isMounted
  const cashierId = params.cashierId || null
  const [ticketList, setTicketList] = useState([])
  const [cashier, setCashier] = useState({ name: '' })

  useEffect(() => {
    ;(async () => {
      let result = await getTickets()
      if (cashierId) {
        let currentCashier = await getCashierData(cashierId)
        if (!currentCashier.closeDate) {
          setTicketList(result.data.tickets)
        }
      }
    })()
  }, [])

  const getCashierData = async cashierId => {
    isMounted = true
    const result = await getCashier(cashierId)
    if (result) {
      if (isMounted) {
        setCashier(result.data.cashier)
        return result.data.cashier
      }
      return () => {
        isMounted = false
      }
    }

    alert('Caixa não encontrado')
    history.push('/main/cashiers')
  }

  const columns = [
    {
      label: 'Mesa',
      name: 'uniqueNumber',
    },
    {
      label: 'Cliente',
      name: 'name',
    },
    {
      label: 'Valor',
      name: 'totalPrice',
      display: 'currency',
    },
  ]

  const editTicket = _id => {
    let ticket = ticketList.find(ticket => ticket._id == _id)
    history.push(`/main/cashier/${cashier._id}/ticket/${ticket.uniqueNumber}`)
  }

  return (
    <Fragment>
      <Link
        style={{ float: 'right', marginLeft: '20px' }}
        to={`/main/cashier/${cashierId}/balance`}
        className='btn btn-success btn-icon-split'
      >
        <span className='text'>Fechamento</span>
      </Link>
      {!cashier.closeDate && (
        <Link
          to={`/main/cashier/${cashierId}/sale`}
          style={{ float: 'right', marginLeft: '20px' }}
          className='btn btn-primary btn-icon-split react-link'
        >
          <span className='text'>Registrar venda</span>
        </Link>
      )}
      <h1 className='h3 mb-2 text-gray-800'>Caixa - {cashier.name}</h1>
      <p className='mb-4'>Lista de comandas em aberto.</p>

      <div className='card shadow mb-4'>
        <div className='card-body'>
          <div className='table-responsive'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='table-filter' />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                {ticketList && (
                  <DataTable
                    columns={columns}
                    data={ticketList}
                    onEdit={_id => editTicket(_id)}
                  />
                )}
                <b>Soma atual do caixa:</b> {toCurrencyReal(cashier.price || 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CashierTickets
