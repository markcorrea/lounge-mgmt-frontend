import React from 'react'

import services from '@services'
import { toCurrencyReal } from '@utilities'

let myTimeout = null
let asyncProductSearchInput = null
class AsyncProductSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      products: [],
    }
  }

  callTimeout = () => {
    myTimeout = setTimeout(async () => {
      this.callSearch()
    }, 1000)
  }

  searchProduct = async () => {
    const { callTimeout, returnSearch, callSearch, setState } = this

    clearTimeout(myTimeout)
    if (event.keyCode !== 13 && this.state.search.length > 0) {
      return callTimeout()
    }
    if (event.keyCode === 13) {
      if (this.props.quickAddToTicket) {
        return returnSearch(null, this.state.search)
      }

      let products = await callSearch(true)

      setState({ search: '' })

      if (products.length < 1) return

      return returnSearch(products[0], '')
    }
    return callSearch()
  }

  componentDidMount() {
    asyncProductSearchInput = document.getElementById('asyncProductSearchInput')
    asyncProductSearchInput.addEventListener('keyup', this.searchProduct)
  }

  componentWillUnmount() {
    asyncProductSearchInput.removeEventListener('keyup', this.searchProduct)
  }

  callSearch = async (isEnterKey = null) => {
    let result = await services.searchProducts({
      [isEnterKey ? 'code' : 'name']: this.state.search,
    })
    this.setState({ products: result.data.products })
    return result.data.products
  }

  returnSearch = (product = null, search) => {
    this.props.returnSearch(product, search)
    this.state.search = ''
  }

  handleInputChange = () => {
    let value = event.target.value
    if (value.length === 0) this.setState({ products: [] })
    this.setState({ search: value })
  }

  productList = products =>
    products.map(product => (
      <tr key={product._id}>
        <td>{product.name}</td>
        <td style={{ width: '100px', textAlign: 'center' }}>
          {toCurrencyReal(product.price || 0)}
        </td>
        <td>
          <a
            onClick={() => this.returnSearch(product, null)}
            className='btn btn-primary btn-icon-split react-link margin-xs'
          >
            <span className='icon text-white-50 react-button-icon'>
              <i className='fas fa-plus' />
            </span>
          </a>
        </td>
      </tr>
    ))

  render() {
    return (
      <div className='row'>
        <div className='col-md-10 col-sm-12 col-xs-12'>
          <div className='form-group product-search-input-container'>
            <input
              id='asyncProductSearchInput'
              type='text'
              disabled={this.props.disabled}
              className='form-control form-control-user'
              placeholder='Insert product name or code'
              value={this.state.search}
              onChange={this.handleInputChange}
              name='productInput'
            />

            {this.state.search.length !== 0 &&
              this.state.products.length !== 0 && (
                <div className='product-search-box'>
                  <table>
                    <tbody>{this.productList(this.state.products)}</tbody>
                  </table>
                </div>
              )}
          </div>
        </div>
        <div className='col-md-2 col-sm-12 col-xs-12'>
          <button
            disabled={this.props.disabled}
            className='btn btn-primary btn-icon-split react-link margin-xs'
            onClick={() => this.returnSearch(null, this.state.search)}
          >
            <span
              style={{ padding: '0.575rem 0.75rem' }}
              className='icon text-white-50'
            >
              <i className='fas fa-plus' />
            </span>
            <span className='text'>Product</span>
          </button>
        </div>
      </div>
    )
  }
}

export default AsyncProductSearch
