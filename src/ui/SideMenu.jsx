import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const SideMenu = ({ match, hideMenu, menus }) => (
  <ul
    className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
      hideMenu ? 'hide-menu' : ''
    }`}
    id='accordionSidebar'
  >
    <a className='sidebar-brand d-flex align-items-center justify-content-center react-link'>
      <div className='sidebar-brand-icon'>{process.env.TITLE}</div>
    </a>

    {menus &&
      menus.map((menu, index) => (
        <Fragment key={`menu_${index}`}>
          <hr className='sidebar-divider my-0' />
          <li className='nav-item'>
            <Link
              className='nav-link react-link'
              to={`${match.path}/${menu.url}`}
            >
              <i className={`fas fa-fw fa-${menu.icon}`} />
              <span>{menu.title}</span>
            </Link>
          </li>
        </Fragment>
      ))}
  </ul>
)

export default SideMenu
