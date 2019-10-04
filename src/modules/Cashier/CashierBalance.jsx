import React, { Fragment, useState, useEffect } from 'react'

import DataTable from '@ui/DataTable'
import ChoiceModal from '@ui/ChoiceModal'

import services from '@services'
import { openModal, showMessage } from '@utilities'

const CashierBalance = ({ match: { params }, history, userData }) => {
  const { closeCashier, getCashier } = services

  const columns = [
    {
      label: 'Product',
      name: 'name',
    },
    {
      label: 'Ticket',
      name: 'uniqueCode',
    },
    {
      label: 'Price',
      name: 'price',
      display: 'currency'
    },
  ]

  const [cashier, setCashier] = useState(null)

  const cashierId = params.cashierId || null

  const fetchCashier = async () => {
    let result = await getCashier(cashierId)
    setCashier(result.data.cashier)
  }

  useEffect(() => {
 
    fetchCashier()
  }, [])

  const closeCurrentCashier = async () => {
    let closedCashier = await closeCashier({ _id: cashierId })
    if (closedCashier) {
      history.push(`/main/cashiers`)
      return
    }
    showMessage('Error: could not close the cashier', 'info')
  }

  return (
    <Fragment>
      <h1 className='h3 mb-2 text-gray-800'>Cashier - Balance</h1>
      <p className='mb-4'>List of Sales.</p>

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
                {cashier && cashier.products && (
                  <DataTable
                    columns={columns}
                    data={cashier.products}
                    totalAttributeName='price'
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <button 
            disabled={((userData && userData.name) !== (cashier && cashier.name)) || cashier && cashier.closeDate}
            className='btn btn-primary btn-icon-split react-link form-button'
            onClick={() => openModal('closeCashier')}
          >
            <span className='text'>Close cashier</span>
          </button>
          <a
            className='btn btn-light btn-icon-split form-button'
            onClick={() => history.push(`/main/cashier/${cashierId}`)}
          >
            <span className='text'>No thanks</span>
          </a>
        </div>
      </div>
      <ChoiceModal
        id='closeCashier'
        title='Close cashier'
        description='Confirm closing this cashier?'
        onConfirm={() => closeCurrentCashier()}
      />
    </Fragment>
  )
}

export default CashierBalance
