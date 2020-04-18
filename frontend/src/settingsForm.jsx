import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export class SettingsForm extends React.Component{
  //should start with values of what is currently in the table
    state = {warehouseName: '',
             email: '',
             phoneNumber: '',
             address: '',
             city: '',
             state: '',
             zipCode: ''};

    submit(){
        //update database with state
        this.setState({warehouseName: '', email: '', phoneNumber: '', address: '', city: '', state: '', zipCode: ''});
    }

    updateProfile = (e) => {
      axios.put('http://localhost:8000/warehouseprofile',{
        warehouseName:this.state.warehouseName,
        email:this.state.email,
        phoneNumber:this.state.phoneNumber,
        address:this.state.address,
        city:this.state.city,
        zipcode:this.state.zipCode,
        state:this.state.state
      }).then(
        res => {
          console.log(res);
          this.getProfile();
        });
    }

    constructor(props){
      super(props);
      this.state = {
        values: []
      };
    }

    getProfile () {
      axios.get('http://localhost:8000/warehouseprofile').then(
        res => {
          const values = res.data;
          console.log(values.data);
          this.setState({values: values.data})
          this.setState({warehouseName: values.data[0].warehouseName})
          this.setState({email: values.data[0].email})
          this.setState({phoneNumber: values.data[0].phoneNumber})
          this.setState({address: values.data[0].address})
          this.setState({city: values.data[0].city})
          this.setState({zipCode: values.data[0].zipcode})
          this.setState({state: values.data[0].state})
        });
    }


    render(){
        return (

            <form className="container">
                <h3 className="container list-group-item bg-secondary text-white">Change Warehouse Settings</h3>

                <div>
                <button type="button" className="btn btn-primary" onClick={ () => this.getProfile()}>Show Profile</button>
                </div>

                <p>{this.state.warehouseName}</p>
                <p>{this.state.email}  {this.state.phoneNumber}</p>
                <p>{this.state.address}</p>
                <p>{this.state.city}  {this.state.state} {this.state.zipCode}</p>

                <div className="list-group-item">
                    <div className="form-group form-row">
                        <label htmlFor="name">Warehouse Name</label>
                        <input type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={this.state.warehouseName}
                            onChange={e => this.setState({ warehouseName: e.target.value })}/>
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
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            className="form-control"
                            value={this.state.phoneNumber}
                            onChange={e => this.setState({ phoneNumber: e.target.value })}/>
                    </div>

                    <div className="form-group form-row">
                        <label htmlFor="address">Street Address</label>
                        <input type="text"
                            id="address"
                            name="address"
                            className="form-control"
                            value={this.state.address}
                            onChange={e => this.setState({ address: e.target.value })}/>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="city">City</label>
                            <input type="text"
                                id="city"
                                name="city"
                                className="form-control"
                                value={this.state.city}
                                onChange={e => this.setState({ city: e.target.value })}/>
                        </div>

                        <div className="form-group col">
                            <label htmlFor="state">State</label>
                            <input type="text"
                                id="state"
                                name="state"
                                className="form-control"
                                value={this.state.state}
                                onChange={e => this.setState({ state: e.target.value })}/>
                        </div>

                        <div className="form-group col">
                            <label htmlFor="zipCode">Zip Code</label>
                            <input type="text"
                                id="zipCode"
                                name="zipCode"
                                className="form-control"
                                value={this.state.zipCode}
                                onChange={e => this.setState({ zipCode: e.target.value })}/>
                        </div>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={ () => this.updateProfile() }>Save Changes</button>
                    <div>
                    <Link to='/inventory'><button type="button" className="btn btn-primary">Back to Inventory</button></Link>
                    </div>
                </div>
            </form>
        );
    }
}
