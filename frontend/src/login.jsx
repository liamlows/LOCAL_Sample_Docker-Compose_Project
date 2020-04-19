import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export class Login extends React.Component{
    state = {
      username: "",
      password: "",
      loginCalled: "",
      passwdcorrect: "",
      };

    constructor(props){
      super(props);
      this.state = {
        values: []
      };
    }

    // submit(){
    //     //update database with state
    //     this.setState({itemID: '',
    //                    itemName: '',
    //                    itemDescription: '',
    //                    numInStock: '',
    //                    price: '',
    //                    itemType: '',
    //                    familySafe: false,
    //                    timeToAssemble: '',
    //                    availableToPackage: false});
    // }

    login() {
      axios.get('http://localhost:8000/users',
      {
        params: {
          user: this.state.username
        }
      }).then(
        res => {
          const values = res.data;
          console.log(values.data);
          this.setState({values: values.data})
          this.setState({loginCalled: "yes"})
          if(this.state.values[0].passwd === this.state.password)
          {
                this.setState({passwdcorrect: "yes"})
          }
        });
      };



    render(){
        return (
          <div>
            <h3 className="container list-group-item bg-secondary text-white">Smith Furniture</h3>

                        <div className="form-group col-18">
                            <label htmlFor="itemID">Username:</label>
                            <input type="text"
                                id="itemID"
                                name="itemID"
                                className="form-control"
                                value={this.state.username}
                                onChange={e => this.setState({ username: e.target.value })}
                                />
                        </div>
                        <div className="form-group col-18">
                            <label htmlFor="itemName">Password:</label>
                            <input type="text"
                                id="itemName"
                                name="itemName"
                                className="form-control"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                                />
                        </div>
                <button type="button" className="btn btn-primary" onClick={ () => this.login() }>Login</button>

                { (() => {
                  if(this.state.loginCalled === "yes"){
                    if (this.state.passwdcorrect === "yes")
                {
                  return (
                    <div>
                  <Link to='/inventory'><button type="button" className="btn btn-primary" >Login success! Click here to go to inventory page.</button></Link>
                    </div>
                  )
                }
                else{
                  return (
                    <div>
                    <p>Please input correct login credentials</p>
                    </div>
                  )
                }}


                } ) ()}

      </div>
       );
    }
}
