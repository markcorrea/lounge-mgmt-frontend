import React from 'react'

import services from '@services'

let myTimeout = null
let asyncClientSearchInput = null
class AsyncClientSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      name: '',
      clients: [],
    }
  }

  callTimeout = () => {
    myTimeout = setTimeout(async () => {
      this.callSearch()
    }, 1000)
  }

  searchClient = () => {
    clearTimeout(myTimeout)
    if (event.keyCode !== 13 && this.state.search.length > 0)
      return this.callTimeout()
    if (event.keyCode === 13) this.addClient(null)
    return this.callSearch()
  }

  componentDidMount() {
    asyncClientSearchInput = document.getElementById('asyncClientSearchInput')
    asyncClientSearchInput.addEventListener('keyup', this.searchClient)
  }

  componentWillUnmount() {
    asyncClientSearchInput.removeEventListener('keyup', this.searchClient)
  }

  callSearch = async () => {
    let result = await services.searchClients({ name: this.state.search })
    this.setState({ clients: result.data.clients })
  }

  addClient = clientId =>
    services
      .addClientToTicket({
        criteria: clientId,
        ticketId: this.props.ticket._id,
      })
      .then(() => {
        this.props.reloadTicket()
        this.setState({ search: '' })
      })

  handleInputChange = () => {
    let value = event.target.value

    if (event.target.name === 'clientInput') {
      this.props.getName(value)
    }

    if (value.length === 0) {
      this.setState({ clients: [] })
    }
    this.setState({ search: value })
  }

  clientList = clients =>
    clients.map(client => (
      <tr key={client._id}>
        <td>{client.name}</td>
        <td>
          <a
            onClick={() => this.addClient(client._id)}
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
      <div className='form-group product-search-input-container'>
        <input
          id='asyncClientSearchInput'
          type='text'
          className='form-control form-control-user'
          placeholder='Insert client name'
          value={this.state.search}
          onChange={this.handleInputChange}
          name='clientInput'
        />

        {this.state.search.length !== 0 && this.state.clients.length !== 0 && (
          <div className='product-search-box'>
            <table>
              <tbody>{this.clientList(this.state.clients)}</tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

export default AsyncClientSearch
