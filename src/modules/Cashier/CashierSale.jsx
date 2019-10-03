import React, { Fragment, useState, useEffect } from 'react'

import AsyncProductSearch from '@ui/AsyncProductSearch'
import ChoiceModal from '@ui/ChoiceModal'

import { showMessage, openModal, toCurrencyReal } from '@utilities'
import services from '@services'

const CashierSale = ({ match: { params }, history }) => {
  const { payProductsOnCashier } = services

  const cashierId = params.cashierId || null

  const [products, setProducts] = useState([])
  const [disabled, setDisabled] = useState(false)

  const addProduct = async (productData, search) => {
    setDisabled(true)
    if (productData) {
      setProducts([...products, productData])
      setDisabled(false)
      return
    }
    if (search && search !== '') {
      let result = await services.searchProducts({
        code: search,
      })
      setProducts([...products, result.data.products[0]])
    }
    setDisabled(false)
  }

  const removeItem = product => {
    const index = products.findIndex(prod => prod._id == product._id)
    let newList = [...products]
    newList.splice(index, 1)
    setProducts(newList)
  }

  const onConfirm = async () => {
    let productIds = products.map(product => product._id)

    let result = await payProductsOnCashier({
      productsIds: productIds,
      cashierId: cashierId,
    })
    if (result) {
      history.push(`/main/cashier/${cashierId}`)
      return
    }
    showMessage('Houve um erro ao tentar realizar o pagamento.', 'info')
    return
  }

  const ConfirmInformation = () => {
    return `Confirma o pagamento destes itens?`
  }

  return (
    <Fragment>
      <h1 className='h3 mb-2 text-gray-800'>Caixa - Registrar Venda</h1>
      <p className='mb-4'>
        Adicione os produtos à tabela para registrar a venda.
      </p>

      <div className='card shadow mb-4'>
        <div className='card-body'>
          <div className='card-body-title'>Adicionar produto</div>
          <div className='table-responsive'>
            <div className='row'>
              <div className='col-md-12'>
                <AsyncProductSearch
                  returnSearch={(productData, search) =>
                    addProduct(productData, search)
                  }
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card shadow mb-4'>
        <div className='card-body'>
          <div className='card-body-title'>Em aberto</div>
          <div className='table-responsive'>
            <div className='row'>
              <div className='col-md-12'>
                <table
                  className='table table-bordered dataTable'
                  id='dataTable'
                  width='100%'
                  cellSpacing='0'
                >
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Valor</th>
                      <th>Remover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length < 1 && (
                      <tr>
                        <td colSpan={3}>
                          Não há produtos adicionados para venda.
                        </td>
                      </tr>
                    )}
                    {products.length > 0 &&
                      products.map((product, index) => (
                        <tr key={'product_' + index}>
                          <td>{product.name}</td>
                          <td>{toCurrencyReal(product.price || 0)}</td>
                          <td className='icon'>
                            <a onClick={() => removeItem(product)}>
                              <i className='fas fa-trash remove' />
                            </a>
                          </td>
                        </tr>
                      ))}

                    <tr>
                      <td className='total' colSpan={4}>
                        <span>Total: </span>
                        <span className='total-value'>
                          {toCurrencyReal(
                            (products.length > 0 &&
                              products.reduce((acc, curr) => {
                                return acc + curr.price
                              }, 0)) ||
                              0
                          )}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  onClick={() => openModal('confirmModal')}
                  className='btn btn-success right ml-20'
                >
                  Pagar
                </button>
                <a
                  className='btn btn-link right ml-20'
                  onClick={() => history.push(`/main/cashier/${cashierId}`)}
                >
                  <span className='text'>Cancelar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChoiceModal
        id='confirmModal'
        title='Confirmação'
        description={<ConfirmInformation />}
        onConfirm={() => onConfirm()}
      />
    </Fragment>
  )
}

export default CashierSale
