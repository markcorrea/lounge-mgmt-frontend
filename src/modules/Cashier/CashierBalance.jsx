import React, { Fragment, useState, useEffect } from 'react'

import DataTable from '@ui/DataTable'
import ChoiceModal from '@ui/ChoiceModal'

import services from '@services'
import { openModal, showMessage } from '@utilities'

const CashierBalance = ({ match: { params }, history, userData }) => {
  const { closeCashier, getCashier } = services

  const columns = [
    {
      label: 'Produto',
      name: 'name',
    },
    {
      label: 'Comanda',
      name: 'uniqueCode',
    },
    {
      label: 'Valor',
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
    showMessage('Houve um erro ao fechar o caixa', 'info')
  }

  return (
    <Fragment>
      <h1 className='h3 mb-2 text-gray-800'>Caixa - Fechamento</h1>
      <p className='mb-4'>Lista de recebimentos.</p>

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
            <span className='text'>Fechar caixa</span>
          </button>
          <a
            className='btn btn-light btn-icon-split form-button'
            onClick={() => history.push(`/main/cashier/${cashierId}`)}
          >
            <span className='text'>Cancelar</span>
          </a>
        </div>
      </div>
      <ChoiceModal
        id='closeCashier'
        title='Fechar caixa'
        description='Confirma fechamento de caixa?'
        onConfirm={() => closeCurrentCashier()}
      />
    </Fragment>
  )
}

export default CashierBalance
