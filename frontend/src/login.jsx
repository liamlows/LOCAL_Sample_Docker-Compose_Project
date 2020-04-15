import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export class Login extends React.Component{
    state = {
      username: "",
      password: "",
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
        });
    }

    render(){
        return (
          <div>
            <h3 className="container list-group-item bg-secondary text-white">Login</h3>

                        <div className="form-group col-3">
                            <label htmlFor="itemID">Username:</label>
                            <input type="text"
                                id="itemID"
                                name="itemID"
                                className="form-control"
                                value={this.state.username}
                                onChange={e => this.setState({ username: e.target.value })}/>
                        </div>
                        <div className="form-group col-9">
                            <label htmlFor="itemName">Password:</label>
                            <input type="text"
                                id="itemName"
                                name="itemName"
                                className="form-control"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                                />
                        </div>
          <Link to='/inventory'><button type="button" className="btn btn-primary" onClick={ () => this.login() }>Login</button></Link>
          <ul>
            { this.state.values.map((value, i) => <li key={i}>{value.passwd}</li>) }
          </ul>
          </div>
        );
        //onClick={ () => this.submit() }
        //<Link to='/inventory'></Link>
    }
}
