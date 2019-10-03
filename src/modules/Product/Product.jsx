import React, { Fragment, useState, useEffect } from 'react'
import CurrencyInput from 'react-currency-input'

import services from '@services'
import { showMessage } from '../../utilities';

const Product = ({ match: { params }, history }) => {
  const { getProduct, saveProduct, updateProduct, getTerminals } = services
  const productId = params.id || null
  let isMounted

  const [product, setProduct] = useState({
    name: '',
    barCode: '',
    quantity: 0,
    price: 0,
    terminal: null,
    uniqueCode: 0,
  })

  const [terminals, setTerminals] = useState([])

  useEffect(() => {
    ;(async () => {
      const result = await getTerminals()
      setTerminals(result.data.terminals)
      if (productId) {
        getProductData(productId)
      }
    })()
  }, [])

  const getProductData = async productId => {
    isMounted = true
    const result = await getProduct(productId)
    if (result) {
      if (isMounted) {
        setProduct(result.data.product)
      }
      return () => {
        isMounted = false
      }
    }

    alert('Produto não encontrado')
    history.push('/main/products')
  }

  const handleInputChange = () => {
    let name = event.target.name
    let value = event.target.value
    setProduct({ ...product, [name]: value })
  }

  const save = async body => {
    let service = productId ? updateProduct : saveProduct
    const result = await service(body)
    if (result) {
    } else {
      showMessage('Houve um erro ao cadastrar o produto', 'error')
      return
    }
    history.push('/main/products')
  }

  return (
    <Fragment>
      <div className='row d-sm-flex align-items-center justify-content-between mb-4'>
        <h1 className='h3 mb-0 text-gray-800'>
          {productId ? 'Editar' : 'Novo'} Produto
        </h1>
      </div>

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <div className='form-group'>
            <div className='small mb-1'>Nome:</div>
            <input
              name='name'
              type='text'
              className='form-control form-control-user'
              value={product.name || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='col-md-6 col-sm-12'>
          <div className='form-group'>
            <div className='small mb-1'>Código de Barras:</div>
            <input
              name='barCode'
              type='text'
              className='form-control form-control-user'
              value={product.barCode || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='col-md-3 col-sm-12'>
          <div className='form-group'>
            <div className='small mb-1'>Código Rápido:</div>
            <input
              name='uniqueCode'
              type='number'
              className='form-control form-control-user'
              value={product.uniqueCode || 0}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='col-md-3 col-sm-12'>
          <div className='form-group'>
            <div className='small mb-1'>Quantidade:</div>
            <input
              name='quantity'
              type='number'
              className='form-control form-control-user'
              value={product.quantity || 0}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='col-md-3 col-sm-12'>
          <div className='form-group'>
            <div className='small mb-1'>Preço:</div>
            <CurrencyInput
              name='price'
              type='text'
              className='form-control form-control-user'
              value={product.price || 0}
              onChangeEvent={handleInputChange}
            />
          </div>
        </div>
        <div className='col-md-3 col-sm-12'>
          <div className='form-group'>
            <div className='small mb-1'>Terminal:</div>
            <select
              name='terminal'
              value={product.terminal}
              onChange={handleInputChange}
              className='form-control'
            >
              <option value=''>Selecione...</option>
              {terminals.map((terminal, index) => (
                <option key={`terminal_${index}`} value={terminal._id}>
                  {terminal.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <a
            className='btn btn-success btn-icon-split react-link form-button'
            onClick={() => save(product)}
          >
            <span className='text'>Salvar</span>
          </a>
          <a
            className='btn btn-light btn-icon-split form-button'
            onClick={() => history.push('/main/products')}
          >
            <span className='text'>Cancelar</span>
          </a>
        </div>
      </div>
    </Fragment>
  )
}

export default Product
