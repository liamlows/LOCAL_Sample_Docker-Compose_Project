import React from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';
import axios from 'axios';

import { GeneralTable } from './generalTable.jsx';

export class Inventory extends React.Component {
  state = {
    names: [],
    itemType:""
  };

  constructor(props){
    super(props);
    {this.getInventory()}
    this.state = {
      values: []
    };
  }
  getInventory () {
    axios.get('http://localhost:8000/inventory').then(
      res => {
        const values = res.data;
        console.log(values.data);
        this.setState({values: values.data})
      });
  }

      getOrderDetails () {
        axios.get('http://localhost:8000/orderdetails',{
          params : {
            orderID:this.state.orderID
          }
        }
        ).then(
          res => {
            const details = res.data;
            console.log(details.data);
            this.setState({details: details.data})
          });
          this.getCustomerDetails()
          this.setState({display: "yes"})
      }

      getType () {
        axios.get('http://localhost:8000/category',{
          params : {
            itemType:this.state.itemType
          }
        }
        ).then(
          res => {
            const values = res.data;
            console.log(values.data);
            this.setState({values: values.data})
          });
      }

  render() {
    return (
      <>
      <h1 id = "header">Inventory</h1>
      <div>
      <Link to='/warehouseProfile'><button type="button" className="btn btn-primary" >Warehouse Profile</button></Link>
      <Link to='/login'><button type="button" className="btn btn-primary" >Logout</button></Link>
      <Link to='newuser'><button type="button" className="btn btn-primary">New user</button></Link>
      <Link to='/orders'><button type="button" className="btn btn-primary">Orders</button></Link>
      </div>
      <div>
      <Link to='/itemDetails'><button type="button" className="btn btn-primary">Add Item to Warehouse</button></Link>
      <Link to='/update'><button type="button" className="btn btn-primary">Update Item</button></Link>
      </div>

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
      <button type="button" className="btn btn-primary" onClick={ () => this.getType()}>Apply Filter</button>
      <button type="button" className="btn btn-primary" onClick={ () => this.getInventory()}>View Full Inventory</button>
      </div>

      <ul>
        <GeneralTable
        items={this.state.values}
        tableClass="table table-bordered table-hover table-sm"
        emptyMessage=""
        emptyClass="alert alert-primary"
        showRowHeader={true}
        />
      </ul>
      </>
    );
  }
}
