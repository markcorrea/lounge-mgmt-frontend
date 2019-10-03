import React, { Fragment, useState, useEffect } from 'react'
import ChoiceModal from '@ui/ChoiceModal'

import DataTable from '@ui/DataTable'
import services from '@services'
import { openModal } from '@utilities'

const Cashiers = ({ history }) => {
  const { getCashiers, openCashier } = services
  const [cashierList, setCashierList] = useState([])

  useEffect(() => {
      fetchCashiers()
  }, [])

  const fetchCashiers = async () => {
    let result = await getCashiers()

    result.data.cashiers.map((cashier) => {
      if (cashier.hasOwnProperty('openDate') && cashier.openDate != undefined) {
        let date = new Date(cashier.openDate)
        cashier.openDate = date.toLocaleString("pt-BR")
      }

      if (cashier.hasOwnProperty('closeDate') && cashier.closeDate != undefined) {
        let date = new Date(cashier.closeDate)
        cashier.closeDate = date.toLocaleString("pt-BR")
      }
    })

    setCashierList(result.data.cashiers)
  }

  const openNewCashier = async () => {
    let cashier = {name: 'marcus'}
    await openCashier(cashier)
    fetchCashiers()
  }

  const editCashier = _id => {
    history.push(`/main/cashier/${_id}`)
  }

  const columns = [
    {
      label: 'Nome',
      name: 'name',
    },
    {
      label: 'Abertura',
      name: 'openDate',
    },
    {
      label: 'Fechamento',
      name: 'closeDate',
    },
    {
      label: 'Valor Total',
      name: 'price',
      display: 'currency'
    },
  ]

  return (
    <Fragment>
      <a
        onClick={() => openModal('openCashier')}
        className='btn btn-primary btn-icon-split'
        style={{ float: 'right', color: 'white' }}
      >
        <span
          style={{ padding: '0.575rem 0.75rem' }}
          className='icon text-white-50'
        >
          <i className='fas fa-plus' />
        </span>
        <span className='text'>Abrir Caixa</span>
      </a>
      <h1 className='h3 mb-2 text-gray-800'>Caixas</h1>
      <p>&nbsp;</p>
      <div className='card shadow mb-4'>
        <div className='card-body'>
          <div className='table-responsive'>
            <div className='row'>
              <div className='col-md-12'>
                {cashierList && (
                  <DataTable
                    columns={columns}
                    data={cashierList}
                    onEdit={editCashier}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChoiceModal
        id='openCashier'
        title='Abrir Caixa'
        description='Deseja abrir um novo caixa com o usuário atual?'
        onConfirm={() => openNewCashier()}
      />
    </Fragment>
  )
}

export default Cashiers
