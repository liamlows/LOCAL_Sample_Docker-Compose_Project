import React from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';
import axios from 'axios';

export class Inventory extends React.Component {
  state = {
    names: ["Water Bottle", "Glasses"]
  };

  addName(name) {
    this.setState(prevState => {
      prevState.names.push(name);
      return prevState;
    });
  }

  render() {
    return (
      <>
        <h1 id = "header">Inventory</h1>
        <InventoryItems names={this.state.names} />
        <Parent onNameAdded={name => this.addName(name)} />
      </>
    );
  }
}

const InventoryItems = props => (
  <>
    <h3 id = "stock">In Stock:</h3>
    <ul id ="list">
      {props.names.map(name => (
        <li>{name}</li>
      ))}
    </ul>
  </>
);

const Parent = props => (
  <>
    <Child {...props} />
  </>
);

class Child extends React.Component {
  state = {
    name: ""
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
       <p> <br /> </p>
       <label for="name">Add an item to the inventory:</label>
        <br />
        <input
          id="name"
          type="text"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <button onClick={() => this.props.onNameAdded(this.state.name)}>
          Add
        </button>
          <Link to='/login'><button type="button" className="btn btn-primary" >Login</button></Link>

          <button type="button" className="btn btn-primary" onClick={ () => this.getInventory() }>Refresh Inventory</button>
          <ul>
            { this.state.values.map((value, i) => <li key={i}>{value.itemName}</li>) }
            { this.state.values.map((value, i) => <li key={i}>{value.itemDescription}</li>) }
            { this.state.values.map((value, i) => <li key={i}>{value.numInStock}</li>) }
          </ul>
      </>
    );
  }
}
