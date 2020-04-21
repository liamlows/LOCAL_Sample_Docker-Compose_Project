import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import { GeneralTable } from './generalTable.jsx';

export class Orders extends React.Component{
  //should start with values of what is currently in the table
    state = {
      orderID:"",
           };


    constructor(props){
      super(props);
      {this.getOrders()}
      this.state = {
        values: [],
        details: []
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
    }

    render(){
        return (
          <form className="container">
          <GeneralTable
          items={this.state.values}
          tableClass="table table-bordered table-hover table-sm"
          emptyMessage=""
          emptyClass="alert alert-primary"
          showRowHeader={true}
          />


          <input type="text"
              id="orderID"
              name="orderID"
              className="form-control"
              value={this.state.orderID}
              onChange={e => this.setState({ orderID: e.target.value })}
              />
              <button type="button" className="btn btn-primary" onClick={ () => this.getOrderDetails() }>View Details</button>

          <GeneralTable
          items={this.state.details}
          tableClass="table table-bordered table-hover table-sm"
          emptyMessage=""
          emptyClass="alert alert-primary"
          showRowHeader={true}
          />

          </form>
        );
    }
}
