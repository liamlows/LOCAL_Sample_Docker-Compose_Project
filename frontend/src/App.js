import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      number: "",
      values: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({number: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    let prod = this.state.number * this.state.number;
    axios.post('http://localhost:8000/multplynumber', {product: prod}).then(res => {
      console.log(res);
      this.fetchVals();
    });
    this.setState({number: ""});
  }

  initSetup = () => {
    axios.post('http://localhost:8000/setupdb').then(res => {
      console.log(res);
      this.fetchVals();
    });
  }

  componentDidMount(){
    this.fetchVals();
  }

  fetchVals = () => {
    axios.get('http://localhost:8000/values').then(
      res => {
        const values = res.data;
        console.log(values.data);
        this.setState({ values: values.data });
    });
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
        <button onClick={this.initSetup}> Initialize DB </button>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.number} onChange={this.handleChange}/>
            <br/>
            <input type="submit" value="Submit" />
          </form>
          <ul>
            { this.state.values.map((value, i) => <li key={i}>{value.value}</li>) }
          </ul>
        </header>
      </div>
    );
  }

}

export default App;
