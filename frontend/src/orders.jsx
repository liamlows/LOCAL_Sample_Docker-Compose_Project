import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import { GeneralTable } from './generalTable.jsx';

export class Orders extends React.Component{
  //should start with values of what is currently in the table
    state = {
      orderID:"",
      customerID:"",
      orderDate:"",
      first:"",
      last:""
           };


    constructor(props){
      super(props);
      {this.getOrders()}
      this.state = {
        values: []
      };
    }

    getOrders () {
      axios.get('http://localhost:8000/orders').then(
        res => {
          const values = res.data;
          console.log(values.data);
          this.setState({values: values.data})
          this.setState({orderID: values.data[0].orderID})
          this.setState({customerID: values.data[0].customerID})
          this.setState({orderDate: values.data[0].orderDate})
          this.setState({first: values.data[0].first})
          this.setState({last: values.data[0].last})
        });
    }


    render(){
        return (
          <GeneralTable
          items={this.state.values}
          tableClass="table table-bordered table-hover table-sm"
          emptyMessage=""
          emptyClass="alert alert-primary"
          showRowHeader={true}
          />
        );
    }
}
