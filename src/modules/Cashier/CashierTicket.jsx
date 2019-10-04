import React, { Fragment, useState, useEffect } from 'react'

import CashierTable from '@ui/CashierTable'
import AsyncProductSearch from '@ui/AsyncProductSearch'
import Spinner from '@ui/Spinner'

import services from '@services'
import { showMessage } from '@utilities'

const CashierTicket = ({ match: { params }, history }) => {
  const {
    getTicketDetailsByUniqueNumber,
    payProducts,
    removeProducts,
    closeTicket,
    registerCredit,
    addProductToTicket,
  } = services
  const ticketUniqueNumber = params.uniqueNumber || null
  const cashierId = params.cashierId || null

  const [ticket, setTicket] = useState({ name: '', uniqueNumber: 0 })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (ticketUniqueNumber) {
      fetchTicket(ticketUniqueNumber)
    }
  }, [])

  const fetchTicket = async ticketUniqueNumber => {
    let result = await getTicketDetailsByUniqueNumber(ticketUniqueNumber)
    setTicket({ ...result.data.ticket })
    setProducts(result.data.ticket.products)
  }

  const columns = [
    {
      label: 'Nome',
      name: 'name',
    },
    {
      label: 'Valor',
      name: 'price',
      display: 'currency',
    },
  ]

  const returnCashierTable = async (selectedItems, operation) => {
    let productsIds = []
    selectedItems.map(item => {
      productsIds.push(item._id)
    })

    let body = {
      ticketId: ticket._id,
      cashierId: cashierId,
      productsIds: productsIds,
    }

    setLoading(true)

    if (operation == 'pay') {
      await payProducts(body)
    } else if (operation == 'remove') {
      await removeProducts(body)
    } else if (operation == 'close') {
      await closeTicket(body)
      setLoading(false)
      history.push(`/main/cashier/${cashierId}`)
      return
    }

    await fetchTicket(ticketUniqueNumber)
    setLoading(false)
  }

  const returnCredit = async input => {
    let body = {
      cashierId: cashierId,
      ticketId: ticket._id,
      price: input,
    }

    await registerCredit(body)
    fetchTicket(ticketUniqueNumber)
  }

  const PendingItems = () => {
    if (loading) return <Spinner />

    return (
      <CashierTable
        columns={columns}
        data={products}
        paid={ticket.paid}
        totalPrice={ticket.totalPrice}
        buttonSelectedLabel='Pay'
        closeTicketLabel='Close ticket'
        buttonDeleteLabel='Remove'
        // creditLabel='Deixar um tanto aqui'
        returnCredit={returnCredit}
        returnCashierTable={returnCashierTable}
        totalAttributeName='price'
      />
    )
  }

  const addProduct = async (product, search) => {
    setLoading(true)
    let productData = {
      isUniqueNumber: product !== null ? false : true,
      criteria: product !== null ? product._id : search,
      ticketId: ticket._id,
    }
    let result = await services.addProductToTicket(productData)
    if (result) {
      fetchTicket(ticketUniqueNumber)
      setLoading(false)
      return
    }
    showMessage('Product not found', 'info')
    setLoading(false)
  }

  return (
    <Fragment>
      <h1 className='h3 mb-2 text-gray-800'>
        Ticket - Table {ticket.uniqueNumber}
      </h1>
      <p className='mb-4'>Client: {ticket.name || '-'}</p>

      <div className='card shadow mb-4'>
        <div className='card-body'>
          <div className='card-body-title'>Add product</div>
          <div className='table-responsive'>
            <div className='row'>
              <div className='col-md-12'>
                <AsyncProductSearch
                  quickAddToTicket={true}
                  disabled={loading}
                  returnSearch={(productData, search) =>
                    addProduct(productData, search)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card shadow mb-4'>
        <div className='card-body'>
          <div className='card-body-title'>Opened</div>
          <div className='table-responsive'>
            <div className='row'>
              <div className='col-md-12'>{products && <PendingItems />}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CashierTicket
