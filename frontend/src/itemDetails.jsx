import React from 'react';
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';
import axios from 'axios';

export class ItemDetails extends React.Component{
    state = {
             itemName: '',
             itemDescription: '',
             numInStock: '',
             price: '',
             itemType: '',
             familySafe: '',
             timeToAssemble: '',
             availableToPackage: ''
            };

            constructor(props){
              super(props);
              this.state = {
                values: []
              };
            }

            addToInventory = (e) => {
              axios.post('http://localhost:8000/inventory',{
                  itemName : this.state.itemName,
                  itemDescription : this.state.itemDescription,
                  numInStock : this.state.numInStock,
                  price : this.state.price,
                  itemType : this.state.itemType,
                  familySafe : this.state.familySafe,
                  availableToPackage : this.state.availableToPackage
              }).then(
                res => {
                  console.log(res);
                  this.reset();
                });
            }

    reset(){
        //update database with state
        this.setState({itemID: '',
                       itemName: '',
                       itemDescription: '',
                       numInStock: '',
                       price: '',
                       itemType: '',
                       familySafe: '',
                       timeToAssemble: '',
                       availableToPackage: ''});
    }

    render(){
        return (
            <form className="container">
                <h3 className="container list-group-item bg-secondary text-white">Add Item to Inventory</h3>
                <div className="list-group-item">
                    <div className="form-row">
                        <div className="form-group col-9">
                            <label htmlFor="itemName">Item Name</label>
                            <input type="text"
                                id="itemName"
                                name="itemName"
                                className="form-control"
                                value={this.state.itemName}
                                onChange={e => this.setState({ itemName: e.target.value })}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-4">
                            <label htmlFor="numInStock">Number in Stock</label>
                            <input type="text"
                                id="numInStock"
                                name="numInStock"
                                className="form-control"
                                value={this.state.numInStock}
                                onChange={e => this.setState({ numInStock: e.target.value })}/>
                        </div>

                        <div className="form-group col-4">
                            <label htmlFor="price">Price</label>
                            <input type="text"
                                id="price"
                                name="price"
                                className="form-control"
                                value={this.state.price}
                                onChange={e => this.setState({ price: e.target.value })}/>
                        </div>

                        <div className="form-group col-4">
                            <label htmlFor="timeToAssemble">Assembly Time(minutes)</label>
                            <input type="text"
                                id="timeToAssemble"
                                name="timeToAssemble"
                                className="form-control"
                                value={this.state.timeToAssemble}
                                onChange={e => this.setState({ timeToAssemble: e.target.value })}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="itemType">Item Type</label>
                            <select
                                id="itemType"
                                name="itemType"
                                className="form-control"
                                value={this.state.itemType}
                                onChange={e => this.setState({ itemType: e.target.value })}>
                                    <option value="Unspecified"></option>
                                    <option value="Living">Living</option>
                                    <option value="Bedroom">Bedroom</option>
                                    <option value="Dining">Dining</option>
                                    <option value="Office">Office</option>
                                    <option value="Outdoor">Outdoor</option>
                                    <option value="Storage">Storage</option>
                                    <option value="COVID">COVID</option>
                                </select>
                        </div>

                        <div className="form-group col">
                            <label htmlFor="state">Family Safe (yes/no)</label>
                            <input type="text"
                                id="familySafe"
                                name="familySafe"
                                className="form-control"
                                value={this.state.familySafe}
                                onChange={e => this.setState({ familySafe: e.target.value })}/>
                        </div>

                        <div className="form-group col">
                            <label htmlFor="availableToPackage">Package Available (yes/no)</label>
                            <input type="text"
                                id="availableToPackage"
                                name="availableToPackage"
                                className="form-control"
                                checked={this.state.availableToPackage}
                                onChange={e => this.setState({ availableToPackage: e.target.value })}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-12">
                            <label htmlFor="itemDescription">Description</label>
                            <textarea id="itemDescription"
                                name="itemDescription"
                                className="form-control"
                                value={this.state.itemDescription}
                                onChange={ e => this.setState({ itemDescription: e.target.value }) } />
                        </div>
                    </div>

                    <div>
                    <Link to='/inventory'><button type="button" className="btn btn-primary" onClick={ () => this.addToInventory() }>Submit</button></Link>
                    </div>
                    <Link to='/inventory'><button type="button" className="btn btn-primary">Cancel</button></Link>
                </div>
            </form>
        );
    }
}
