import React from 'react'

import { Link } from 'react-router-dom'

const renderData = ({ title, text, uniqueNumber, color = 'success' }) => (
  <div className={`card ticket-card border-left-${color} shadow py-2`}>
    <div className='card-body'>
      <div className='row no-gutters align-items-center'>
        <div className='col mr-2'>
          <div
            className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}
          >
            {title}
          </div>
          <div className='h5 mb-0 font-weight-bold text-gray-800'>{text}</div>
        </div>
        <div className='col-auto'>
          <span className='fa-2x text-gray-300'>{uniqueNumber}</span>
        </div>
      </div>
    </div>
  </div>
)

const checkLink = props => {
  if (props.linkTo !== undefined) return <Link to={props.linkTo}>{renderData(props)}</Link>
  return renderData(props)
}

const Card = props => (
  <div className='col-xl-3 col-md-6 mb-4'>{checkLink(props)}</div>
)

export default Card