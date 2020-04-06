import React from 'react'

export class LoginButton extends React.Component {
  render() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/">
            Login
          </a>
        </li>
      </ul>
    );
  }    
}