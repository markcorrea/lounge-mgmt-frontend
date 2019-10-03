import React from 'react'

import { Link } from 'react-router-dom'

const card = ({ title, text, uniqueNumber, color = 'success' }) => (
  <div className={`card ticket-card border-left-${color} shadow py-2`}>
    <div className='card-body'>
      <div className='row no-gutters align-items-center'>
        <div className='col mr-2'>
          <div
            className={`font-weight-bold text-${color} text-uppercase mb-1 terminal-size`}
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

const verifyLink = props => {
  if (props.linkTo !== undefined)
    return <Link to={props.linkTo}>{card(props)}</Link>
  return card(props)
}

const TerminalCard = props => (
  <div className='col-xl-4 col-sm-12 mb-4'>{verifyLink(props)}</div>
)

export default TerminalCard
