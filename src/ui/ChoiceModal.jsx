import React from 'react'

import { closeModal } from '@utilities'

const ChoiceModal = ({id, title, description, onConfirm}) => {
  const clickConfirm = () => {
    onConfirm()
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
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={() => closeModal(id)}
            >
              No thanks
            </button>
            <button type='button' className='btn btn-primary' onClick={clickConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChoiceModal
