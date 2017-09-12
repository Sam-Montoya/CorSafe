import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/MainDashboard';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
