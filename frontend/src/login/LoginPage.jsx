import React from 'react'
import { Navbar } from '../layout/Navbar'
import './login.css'

export class LoginPage extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="login-layout">
          <h3 className="text-center mb-4">
            Login or sign up to DogMD
          </h3>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" 
                     className="form-control"
                     id="username"
                     placeholder="Username"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" 
                     className="form-control"
                     id="password"
                     placeholder="Password"/>
            </div>
            <div className="form-group">
              <button className="btn btn-block btn-success">Login</button>
            </div>
            <div className="form-group">
              <button className="btn btn-block btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </>
    )
  }
}