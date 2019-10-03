import React, { Fragment } from 'react'
import OrderReadySocket from '@ui/OrderReadySocket'

import services from '@services'

class NewTicket extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      number: '',
    }
  }

  handleInputChange = () => {
    let value = event.target.value
    this.setState({ number: value })
  }

  saveNewTicket = async () => {
    if (this.state.number !== '') {
      const result = await services.saveTicket({
        uniqueNumber: this.state.number,
      })
      if (
        result.response &&
        result.response.status &&
        result.response.status === 400
      ) {
        $('.alert').show()
        return
      }
      this.props.history.push(
        `/main/edit-ticket/${result.data.persistedTicket.uniqueNumber}`
      )
    }
  }

  render() {
    return (
      <Fragment>
        <OrderReadySocket />
        <div
          style={{ display: 'none' }}
          className='alert alert-danger alert-dismissible fade show'
          role='alert'
        >
          <strong>Opa!!</strong> A mesa já está cadastrada.
          <button
            type='button'
            className='close'
            data-dismiss='alert'
            aria-label='Close'
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <div className='row d-sm-flex align-items-center justify-content-between mb-4'>
          <h1 className='h3 mb-0 text-gray-800'>Criar Comanda</h1>
        </div>
        <div className='row'>
          <div style={{ margin: '0 auto' }} className='form-group'>
            <input
              type='number'
              className='form-control form-control-user'
              id='numero'
              placeholder='Número da comanda'
              value={this.state.number}
              onChange={this.handleInputChange}
              name='number'
            />
          </div>
        </div>
        <div className='row mt-20'>
          <a
            style={{ margin: '0 auto' }}
            className='btn btn-primary btn-icon-split react-link'
            onClick={this.saveNewTicket}
          >
            <span
              style={{ padding: '0.575rem 0.75rem' }}
              className='icon text-white-50'
            >
              <i className='fas fa-plus' />
            </span>
            <span className='text'>Salvar</span>
          </a>
        </div>
      </Fragment>
    )
  }
}

export default NewTicket
