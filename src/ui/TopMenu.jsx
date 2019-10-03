import React from 'react'
import { withRouter } from 'react-router-dom'

import services from '@services'

const TopMenu = ({ toggleSideMenu, user, history }) => {
  const { logoutUser } = services
  const logout = async () => {
    await logoutUser()
    history.push(`/`)
  }

  return (
    <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
      <button
        onClick={toggleSideMenu}
        id='sidebarToggleTop'
        className='btn btn-link d-md-none rounded-circle mr-3'
      >
        <i className='fa fa-bars' />
      </button>

      <ul className='navbar-nav ml-auto'>
        <div className='topbar-divider d-none d-sm-block' />

        <li className='nav-item dropdown no-arrow'>
          <a
            className='nav-link dropdown-toggle'
            href='#'
            id='userDropdown'
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <span className='mr-2 d-none d-lg-inline text-gray-600 small'>
              {(user && user.name) || '-'}
            </span>
            <div className='logout-icon' onClick={logout}>
              <i className='fas fa-sign-out-alt' />
            </div>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(TopMenu)
