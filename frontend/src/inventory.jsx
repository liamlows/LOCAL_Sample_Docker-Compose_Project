import React from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';
import axios from 'axios';

import { GeneralTable } from './generalTable.jsx';
import { SearchBar } from './searchBar.jsx'

export class Inventory extends React.Component {
  state = {
    names: [],
    itemType:"",
    searchText:""
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

      onSearch () {
        axios.get('http://localhost:8000/search',{
          params : {
            search:this.state.searchText
          }
        }
        ).then(
          res => {
            const values = res.data;
            console.log(values.data);
            this.setState({values:values.data})
          });
      }
      familySafe () {
        axios.get('http://localhost:8000/familySafe',{
          params : {
            search:this.state.searchText
          }
        }
        ).then(
          res => {
            const values = res.data;
            console.log(values.data);
            this.setState({values:values.data})
          });
      }

      package () {
        axios.get('http://localhost:8000/package',{
          params : {
            search:this.state.searchText
          }
        }
        ).then(
          res => {
            const values = res.data;
            console.log(values.data);
            this.setState({values:values.data})
          });
      }
      priceasc () {
        axios.get('http://localhost:8000/priceasc',{
          params : {
            search:this.state.searchText
          }
        }
        ).then(
          res => {
            const values = res.data;
            console.log(values.data);
            this.setState({values:values.data})
          });
      }
      pricedesc () {
        axios.get('http://localhost:8000/pricedesc',{
          params : {
            search:this.state.searchText
          }
        }
        ).then(
          res => {
            const values = res.data;
            console.log(values.data);
            this.setState({values:values.data})
          });
      }
      restock () {
        axios.get('http://localhost:8000/restock',{
          params : {
            search:this.state.searchText
          }
        }
        ).then(
          res => {
            const values = res.data;
            console.log(values.data);
            this.setState({values:values.data})
          });
      }

  render() {
    return (
      <>
      <h1 id = "header">Inventory</h1>
      <div>
      <Link to='/warehouseProfile'><button type="button" className="btn btn-primary" >Warehouse Profile</button></Link>
      <Link to='/login'><button type="button" className="btn btn-primary" >Logout</button></Link>
      <Link to='/orders'><button type="button" className="btn btn-primary">Orders</button></Link>
      </div>

      <div>
      <Link to='/itemDetails'><button type="button" className="btn btn-primary">Add Item to Warehouse</button></Link>
      <Link to='/update'><button type="button" className="btn btn-primary">Update Item</button></Link>
      </div>

      <form class="4">
          <div class="form-group">
              <label for="textInput">Search</label>
              <input type="text"
                  className="form-control"
                  id="textInput"
                  placeholder="Item name or keyword"
                  value={this.state.searchText}
                  onChange={e => this.setState({ searchText: e.target.value })}
              ></input>
          </div>
          <button type="button"
              className="btn btn-primary"
              onClick={() => this.onSearch() }>Search</button>

          <div className="form-group col">
              <label htmlFor="itemType">Filter by Item Type</label>
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
                  </div>
                  <button type="button" className="btn btn-primary" onClick={ () => this.familySafe()}>View Family Safe Items</button>
                  <button type="button" className="btn btn-primary" onClick={ () => this.package()}>View Packageable Items</button>
                  <button type="button" className="btn btn-primary" onClick={ () => this.priceasc()}>Price: Low to High</button>
                  <button type="button" className="btn btn-primary" onClick={ () => this.pricedesc()}>Price: High to Low</button>
                  <button type="button" className="btn btn-primary" onClick={ () => this.restock()}>Items to Restock</button>
                  <button type="button" className="btn btn-primary" onClick={ () => this.getInventory()}>View Full Inventory</button>
      </form>
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
