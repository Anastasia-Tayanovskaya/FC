import React, { Component } from 'react';
import Login from './login';
import Logout from './logout';
import { loginUser } from '../actions/login.action';
import { logoutUser } from '../actions/logout.action';

export default class Logbar extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    return (
      <nav className='navbar navbar-default'>
          <div className='navbar-form'>

            {!isAuthenticated &&
              <Login
                errorMessage={errorMessage}
                onLoginClick={ creds => dispatch(loginUser(creds)) }
              />
            }

            {isAuthenticated &&
              <Logout onLogoutClick={() => dispatch(logoutUser())} />
            }

          </div>
      </nav>
    )
  }

}