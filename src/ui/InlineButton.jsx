import React from 'react'

const InlineButton = ({text = null, click}) => {
  return (
    <a
      onClick={click}
      className='btn btn-primary btn-icon-split react-link inline-button'
    >
      <span className='icon text-white-50 react-button-icon'>
        <i className='fas fa-plus' />
      </span>
      {text && text !== '' && <span className='text'>{text}</span>}
    </a>
  )
}

export default InlineButton