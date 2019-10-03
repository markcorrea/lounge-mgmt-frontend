import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import DataTable from '@ui/DataTable'
import AsyncInput from '@ui/AsyncInput'
import Spinner from '@ui/Spinner'

import services from '@services'
import { showMessage } from '../../utilities';

const Products = ({ history }) => {
  const { searchProducts, getProducts, deleteProduct } = services
  const [productList, setProductList] = useState([])

  useEffect(() => {
    ;(async () => {
      fetchProducts()
    })()
  }, [])

  const fetchProducts = async () => {
    let result = await getProducts()

    result.data.products.map(product => {
      if (product.hasOwnProperty('terminal') && product.terminal != undefined) {
        product.terminal = product.terminal.name
      }
    })

    setProductList(result.data.products)
  }

  const editProduct = _id => {
    history.push(`/main/product/${_id}`)
  }

  const removeProduct = async _id => {
    const result = await deleteProduct(_id)
    if (!result) {
      showMessage('Houve um erro ao remover o produto.', 'error')
      return
    }
    fetchProducts()
  }

  const searchProduct = async search => {
    let result = await searchProducts({ name: search })
    setProductList(result.data.products)
  }

  const columns = [
    {
      label: 'Nome',
      name: 'name',
    },
    {
      label: 'Quantidade',
      name: 'quantity',
    },
    {
      label: 'Terminal',
      name: 'terminal',
    },
    {
      label: 'Preço',
      name: 'price',
      display: 'currency'
    },
  ]

  return (
    <Fragment>
      <Link
        style={{ float: 'right' }}
        to={`/main/product`}
        className='btn btn-primary btn-icon-split'
      >
        <span
          style={{ padding: '0.575rem 0.75rem' }}
          className='icon text-white-50'
        >
          <i className='fas fa-plus' />
        </span>
        <span className='text'>Novo Produto</span>
      </Link>
      <h1 className='h3 mb-2 text-gray-800'>Produtos</h1>
      <p className='mb-4'>
        Listagem de produtos disponíveis. Filtre para facilitar a busca.
      </p>

      <div className='card shadow mb-4'>
        <div className='card-body'>
          <div className='table-responsive'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='table-filter'>
                  <label>
                    Search:
                    <AsyncInput callbackFunction={search => searchProduct(search)} />
                  </label>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                {productList && productList.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={productList}
                    onEdit={editProduct}
                    onDelete={removeProduct}
                  />
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Products
