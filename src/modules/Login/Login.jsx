import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import services from '@services'

const Login = ({ history }) => {
  const { login } = services
  const [loginData, setLoginData] = useState({ email: '', password: '' })


  const handleInputChange = () => {
    let value = event.target.value
    let name = event.target.name

    setLoginData({ ...loginData, [name]: value })
  }

  const clickLogin = async () => {
    event.preventDefault()
    const loginStatus = await login(loginData)
    if (loginStatus) {
      history.push('/main')
    } else {
      alert('Unauthorized')
    }
  }

  return (
    <div className='bg-gradient-primary'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-10 col-lg-12 col-md-9'>
            <div className='card o-hidden border-0 shadow-lg my-5'>
              <div className='card-body p-0'>
                <div className='row'>
                  <div className='col-lg-6 d-none d-lg-block bg-login-image' style={{ backgroundImage: "url(" + process.env.LOGO_MAIN + ")"}}/>
                  <div className='col-lg-6'>
                    <div className='p-5'>
                      <div className='text-center'>
                        <h1 className='h4 text-gray-900 mb-4'>{ process.env.TITLE }</h1>
                      </div>
                      <form className='user'>
                        <div className='form-group'>
                          <input
                            type='email'
                            className='form-control form-control-user'
                            id='exampleInputEmail'
                            aria-describedby='emailHelp'
                            placeholder='E-mail here...'
                            name='email'
                            value={loginData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className='form-group'>
                          <input
                            type='password'
                            className='form-control form-control-user'
                            id='exampleInputPassword'
                            placeholder='Password'
                            name='password'
                            value={loginData.password}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button
                          onClick={() => clickLogin()}
                          className='btn btn-primary btn-user btn-block react-link'
                        >
                          Login
                        </button>
                      </form>
                      <div className='text-center'>
                        <a className='small' href='forgot-password.html'>
                          Forgot my password
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Login)
