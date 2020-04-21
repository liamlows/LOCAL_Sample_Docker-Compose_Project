import React from 'react';
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';
import axios from 'axios';

export class UpdateItem extends React.Component{

  //Only Update Description, Price, and Quantity in Stock
    state = {
             itemID: '',
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

            update = (e) => {
              axios.put('http://localhost:8000/inventory',{
                  itemID: this.state.itemID,
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

            getItemDetails () {
              axios.get('http://localhost:8000/inventory/3',
              ).then(
                res => {
                  const values = res.data;
                  console.log(values.data);
                  this.setState({values: values.data})
                  this.setState({itemName: values.data[0].itemName})
                  this.setState({itemDescription: values.data[0].itemDescription})
                  this.setState({numInStock: values.data[0].numInStock})
                  this.setState({price: values.data[0].price})
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
                <h3 className="container list-group-item bg-secondary text-white">Update Item - Input Item ID</h3>
                <div className="list-group-item">
                    <div className="form-row">
                        <div className="form-group col-9">
                            <label htmlFor="itemID">Item ID</label>
                            <input type="text"
                                id="itemID"
                                name="itemID"
                                className="form-control"
                                value={this.state.itemID}
                                onChange={e => this.setState({ itemID: e.target.value })}
                                onChange={e => this.getItemDetails()}/>
                        </div>
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
                    <Link to='/inventory'><button type="button" className="btn btn-primary" onClick={ () => this.update() }>Submit</button></Link>
                    </div>
                    <Link to='/inventory'><button type="button" className="btn btn-primary">Cancel</button></Link>
                </div>
            </form>
        );
    }
}
