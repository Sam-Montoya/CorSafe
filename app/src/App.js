import './Reset.css';
import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import DashboardController from './components/Dashboard/DashboardController';
import SideNavBar from './components/SideNavBar';
import UserSettings from './components/Settings/UserSettings';
import SubmitTicket from './components/Tickets/SubmitTicket';
import MyTickets from './components/Tickets/MyTickets';
import SelectedTicket from './components/Tickets/SelectedTicket';


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' render={() => {
            return (
              <div>
                <SideNavBar />
                <Switch>
                  <Route exact path="/dashboard" component={DashboardController} />
                  <Route path="/dashboard/submit-ticket" component={SubmitTicket} />
                  <Route path="/dashboard/my-tickets" component={MyTickets} />
                  <Route path="/dashboard/ticket" component={SelectedTicket} />
                  <Route path="/dashboard/settings" component={UserSettings} />
                  <Route path="/dashboard/help" />
                  {/* <Route path="/help"  /> */}
                </Switch>
              </div>
            )
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
