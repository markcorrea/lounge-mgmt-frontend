import React from 'react'

let myTimeout = null
let asyncInput = null
class AsyncInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
    }
  }

  callTimeout = () => {
    myTimeout = setTimeout(async () => {
      this.callSearch()
    }, 1000)
  }

  searchProduct = () => {
    clearTimeout(this.myTimeout)
    if (event.keyCode !== 13) return this.callTimeout()
    return this.callSearch()
  }

  componentDidMount() {
    asyncInput = document.getElementById('asyncInput')
    asyncInput.addEventListener('keyup', this.searchProduct)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.searchProduct)
  }

  handleInputChange = () => {
    const value = event.target.value
    this.setState({ search: value })
  }

  callSearch = () => {
    this.props.callbackFunction(this.state.search)
  }

  render() {
    return (
      <input
        id="asyncInput"
        type='search'
        className='form-control form-control-sm'
        value={this.state.search}
        onChange={this.handleInputChange}
      />
    )
  }
}

export default AsyncInput
