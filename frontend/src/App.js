import axios from 'axios';

import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Login} from './login';
import {Inventory} from './inventory';
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';

//For Warehouse settings and adding an item
import { SettingsForm } from './settingsForm.jsx';
import { ItemDetails } from './itemDetails.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
        <Switch>
         <Route exact path="/" component={Login} />
        <Route path="/inventory" component={ Inventory} />
          <Route path="/login" component={ Login} />
          <Route path="/itemDetails" component={ItemDetails}/>
        </Switch>
        </Router>
      </header>
    </div>
  );
  //  <Link to="/">Login</Link>{' '}
  //  <Login />
  // <Router>
  //   <Switch>
  //   <Route exact path="/" component={ Login } />
  //   </Switch>
  // </Router>
  // <Route exact path="/" component={ AccountsDashboard } />
  // <Route path="/create" component={ AccountEditor } />
  // <Route path="/edit/:accountId" component={ AccountEditor } />
}

export default App;
