import React from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';
import axios from 'axios';

export class Inventory extends React.Component {
  state = {
    names: []
  };

  constructor(props){
    super(props);
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

  render() {
    return (
      <>
      <h1 id = "header">Inventory</h1>
      <ul>
        { this.state.values.map((value, i) => <li key={i}>{value.itemName}</li>) }
        { this.state.values.map((value, i) => <li key={i}>{value.itemDescription}</li>) }
        { this.state.values.map((value, i) => <li key={i}>{value.numInStock}</li>) }
      </ul>
      <Link to='/login'><button type="button" className="btn btn-primary" >Logout</button></Link>
       <Link to='/itemDetails'><button type="button" className="btn btn-primary">Add Item to Warehouse</button></Link>

          <button type="button" className="btn btn-primary" onClick={ () => this.getInventory() }>View/Refresh Inventory</button>
      </>
    );
  }
}
