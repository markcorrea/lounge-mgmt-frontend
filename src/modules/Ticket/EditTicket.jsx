import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Card from '@ui/Card'
import AsyncProductSearch from '@ui/AsyncProductSearch'
import AsyncClientSearch from '@ui/AsyncClientSearch'
import Spinner from '@ui/Spinner'
import OrderReadySocket from '@ui/OrderReadySocket'
import InlineButton from '@ui/InlineButton'
import InputModal from '@ui/InputModal'

import services from '@services'
import { showMessage, toCurrencyReal, openModal } from '@utilities'

const InputModalInformation = () => {
  return `Número da nova mesa:`
}

class EditTicket extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      number: '',
      ticket: {},
      totalPrice: 0,
      disabled: false,
      user: {
        name: '',
        email: '',
        birthDate: '',
        uniqueNumber: '',
      },
    }
  }

  componentDidMount() {
    this.fetchTicket()
  }

  handleModalInputChange = () => {
    let name = event.target.name
    let value = event.target.value

    let newClient = Object.assign({}, this.state.user)
    newClient[name] = value

    this.setState({ user: newClient })
  }

  updateTicket = ticket => {
    this.setState(ticket)
  }

  reloadTicket = () => {
    this.fetchTicket()
    this.toggleModal()
  }

  fetchTicket = async () => {
    this.setState({ loading: true })
    const result = await services.getTicketByUniqueNumber(
      this.props.match.params.uniqueNumber
    )
    this.setState({ ticket: result.data.ticket, loading: false })
  }

  toggleModal = () => {
    $('#customerModal').modal('toggle')
  }

  getName = name => {
    this.setState({ user: { name: name } })
  }

  createClientAndCloseModal = async () => {
    let newClient = await services.addClient(this.state.user)
    await services.addClientToTicket({
      criteria: newClient.data.persistedClient._id,
      ticketId: this.state.ticket._id,
    })
    this.reloadTicket()
  }

  addProduct = async (product, search) => {
    this.setState({disabled: true})
    let productData = {
      isUniqueNumber: product !== null ? false : true,
      criteria: product !== null ? product._id : search,
      ticketId: this.state.ticket._id,
    }
    let result = await services.addProductToTicket(productData)

    if (result) {
      this.fetchTicket()
      this.setState({disabled: false})
      return
    }
    showMessage('Product not found', 'info')
    this.setState({disabled: false})
  }

  confirmInputModal = async nextTable => {
    let prevTable = this.props.match.params.uniqueNumber

    let result = await services.changeTicketTable({ prevTable, nextTable })
    if (result) {
      this.props.history.push(`/main/edit-ticket/${nextTable}`)
      return
    }
    showMessage('Error: could not change the table.', 'info')
  }

  render() {
    return (
      <Fragment>
        <OrderReadySocket />
        <button
          style={{ float: 'right', marginLeft: '20px' }}
          onClick={() => openModal('inputModal')}
          className='btn btn-success btn-icon-split'
        >
          <span className='text'>Cange table</span>
        </button>
        <h1 className='h3 text-gray-800'>
          Edit ticket {this.props.match.params.uniqueNumber}
        </h1>
        <p className='mb-4'>
          Cliente:{' '}
          {this.state.ticket.name || <InlineButton click={this.toggleModal} />}
        </p>
        <AsyncProductSearch
          quickAddToTicket={true}
          returnSearch={(productData, search) =>
            this.addProduct(productData, search)
          }
          disabled={this.state.disabled}
        />

        <div className='row'>
          {this.state.ticket.products &&
          this.state.ticket.products.length > 0 ? (
            this.state.ticket.products.map((product, index) => {
              return (
                <Card
                  key={product._id + index}
                  title={product.name || 'sem nome'}
                  text={toCurrencyReal(product.price || 0)}
                  uniqueNumber={product.quantity}
                  color='danger'
                />
              )
            })
          ) : this.state.loading ? (
            <Spinner />
          ) : (
            <div style={{ margin: '20px auto' }}>
              No registered orders.
            </div>
          )}
        </div>

        <div className='total-price shadow'>
          Total:{' '}
          {this.state.ticket &&
            toCurrencyReal(this.state.ticket.totalPrice || 0)}
        </div>

        <div
          id='customerModal'
          className='modal fade bd-example-modal-xl'
          role='dialog'
          aria-labelledby='myExtraLargeModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-xl'>
            <div className='modal-content'>
              <div className='modal-container'>
                <h1 className='h3 mb-0 text-gray-800'>New client</h1>
                <div className='row mt-50'>
                  <div className='col-md-12' style={{ zIndex: 10 }}>
                    <AsyncClientSearch
                      ticket={this.state.ticket}
                      reloadTicket={this.reloadTicket}
                      getName={this.getName}
                    />
                  </div>
                  <div className='col-md-6' style={{ zIndex: 1 }}>
                    <div className='form-group product-search-input-container'>
                      <input
                        type='text'
                        className='form-control form-control-user'
                        placeholder='E-mail'
                        name='email'
                        value={this.state.user.email}
                        onChange={this.handleModalInputChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-6' style={{ zIndex: 1 }}>
                    <div className='form-group product-search-input-container'>
                      <input
                        type='number'
                        className='form-control form-control-user'
                        placeholder='CPF'
                        name='uniqueNumber'
                        value={this.state.user.uniqueNumber}
                        onChange={this.handleModalInputChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-4' style={{ zIndex: 1 }}>
                    <div className='form-group product-search-input-container'>
                      <input
                        type='text'
                        className='form-control form-control-user'
                        placeholder='Data de nascimento'
                        name='birthDate'
                        value={this.state.user.birthDate}
                        onChange={this.handleModalInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='row mt-50'>
                  <div className='col-md-12'>
                    <a
                      onClick={this.createClientAndCloseModal}
                      style={{ marginLeft: '20px', float: 'right' }}
                      className='btn btn-primary btn-icon-split react-link'
                    >
                      <span className='text'>Save</span>
                    </a>
                    <a
                      onClick={this.toggleModal}
                      style={{ marginLeft: '20px', float: 'right' }}
                      className='btn btn-light btn-icon-split'
                    >
                      <span className='text'>Cancel</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InputModal
          id='inputModal'
          title='Mudança de mesa'
          description={<InputModalInformation />}
          onConfirm={input => this.confirmInputModal(input)}
        />
      </Fragment>
    )
  }
}

export default EditTicket
