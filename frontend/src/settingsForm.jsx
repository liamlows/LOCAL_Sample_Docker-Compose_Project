import React from 'react';

export class SettingsForm extends React.Component{
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

    render(){
        return (
            <form className="container">
                <h3 className="container list-group-item bg-secondary text-white">Change Warehouse Settings</h3>
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


                    <button type="button" className="btn btn-primary" onClick={ () => this.submit() }>Submit</button>
                </div>
            </form>
        );
    }
}