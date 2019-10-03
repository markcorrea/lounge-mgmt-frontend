import React, { useState } from 'react'

import { closeModal } from '@utilities'

const InputModal = ({ id, title, description, onConfirm }) => {
  const [input, setInput] = useState('')

  const handleInputChange = () => {
    let value = event.target.value
    setInput(value)
  }

  const clickConfirm = () => {
    onConfirm(parseInt(input))
    closeModal(id)
  }

  return (
    <div id={id} className='modal' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{title}</h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <p>{description}</p>
            <div className='form-group'>
              <input
              type='number'
              className='form-control form-control-user'
              value={input || 0}
              onChange={handleInputChange}
            />
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={() => closeModal(id)}
            >
              Fechar
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={clickConfirm}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputModal
