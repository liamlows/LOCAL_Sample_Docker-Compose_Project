import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import { GeneralTable } from './generalTable.jsx';

export class Orders extends React.Component{
  //should start with values of what is currently in the table
    state = {
      orderID:""
           };


    constructor(props){
      super(props);
      {this.getOrders()}
      this.state = {
        values: [],
        details: [],
        customer: [],
        display:""
      };
    }

    getOrders () {
      axios.get('http://localhost:8000/orders').then(
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

    getCustomerDetails () {
      axios.get('http://localhost:8000/customer',{
        params : {
          customerID:this.state.values[this.state.orderID-1].customerID
        }
      }
      ).then(
        res => {
          const customer = res.data;
          console.log(customer.data);
          this.setState({customer: customer.data})
        });
    }
    render(){
        return (

          <form className="container">
          <h1 id = "header">Orders</h1>

          <Link to='/inventory'><button type="button" className="btn btn-primary" >Back to Inventory</button></Link>

          <GeneralTable
          items={this.state.values}
          tableClass="table table-bordered table-hover table-sm"
          emptyMessage=""
          emptyClass="alert alert-primary"
          showRowHeader={true}
          />

          <p>Order ID:</p>
          <input type="text"
              id="orderID"
              name="orderID"
              className="form-control"
              value={this.state.orderID}
              onChange={e => this.setState({ orderID: e.target.value })}
              />
              <button type="button" className="btn btn-primary" onClick={ () => this.getOrderDetails()} >View Details</button>

          <GeneralTable
          items={this.state.details}
          tableClass="table table-bordered table-hover table-sm"
          emptyMessage=""
          emptyClass="alert alert-primary"
          showRowHeader={true}
          />

          <GeneralTable
          items={this.state.customer}
          tableClass="table table-bordered table-hover table-sm"
          emptyMessage=""
          emptyClass="alert alert-primary"
          showRowHeader={false}
          />

          </form>
        );
    }
}
