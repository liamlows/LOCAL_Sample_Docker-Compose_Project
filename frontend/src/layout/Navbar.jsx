import React from 'react'
import { Login } from '../login/Login'

export class Navbar extends React.Component {
  menu = [
    'Dog', 'Cat', 'Rabbit'
  ];

  state = {
    sum: 0,
  };

  addSum() {
    this.state.sum += 1;
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a href="/" className="navbar-brand mr-0 mr-md-2">
          <img src={process.env.PUBLIC_URL + '/logo512.png'} width="30" height="30" class="d-inline-block align-top" alt=""/>
          Dog Store
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            {
              this.menu.map(item => (
                <li className="nav-item">
                  <a className="nav-link" href="/" onclick={() => this.addSum()}>
                    {item}
                  </a>
                </li>
              ))
            }
          </ul>          
          <Login />
        </div>
      </nav>
    );  
  }
}