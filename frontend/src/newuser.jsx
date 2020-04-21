import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export class NewUser extends React.Component{
  //should start with values of what is currently in the table
    state = {username: '',
             first: '',
             last: '',
             password: '',
             email: '',
           };

           createUser = (e) => {
             axios.post('http://localhost:8000/users',{
               username:this.state.username,
               passwd:this.state.password,
               email:this.state.email,
               firstName:this.state.first,
               lastName:this.state.last,
             }).then(
               res => {
                 console.log(res);
               });
           }

    render(){
        return (
            <form className="container">
                <h3 className="container list-group-item bg-secondary text-white">New User</h3>

                <div className="list-group-item">
                    <div className="form-group form-row">
                        <label htmlFor="name">Username</label>
                        <input type="text"
                            id="Username"
                            name="Username"
                            className="form-control"
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}/>
                    </div>

                    <div className="form-group form-row">
                        <label htmlFor="email">Email</label>
                        <input type="text"
                            id="email"
                            name="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}/>
                    </div>

                    <div className="form-group form-row">
                        <label htmlFor="phoneNumber">First Name</label>
                        <input type="text"
                            id="First Name"
                            name="First Name"
                            className="form-control"
                            value={this.state.first}
                            onChange={e => this.setState({ first: e.target.value })}/>
                    </div>

                    <div className="form-group form-row">
                        <label htmlFor="address">Last Name</label>
                        <input type="text"
                            id="Last Name"
                            name="Last Name"
                            className="form-control"
                            value={this.state.last}
                            onChange={e => this.setState({ last: e.target.value })}/>
                    </div>

                        <div className="form-group row">
                            <label htmlFor="city">Password</label>
                            <input type="text"
                                id="password"
                                name="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}/>

                    </div>

                    <Link to='/login'><button type="button" className="btn btn-primary" onClick={ () => this.createUser() }>Create New User</button></Link>
                    <div>
                    <Link to='/inventory'><button type="button" className="btn btn-primary">Cancel</button></Link>
                    </div>


                    </div>
                </form>
            );
        }
    }