import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentUser, updateNavBarText } from '../ducks/user-reducer';

import axiosController from '../../axiosController';

import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

import SubmitTicket from '../Tickets/SubmitTicket';
import MyTickets from '../Tickets/MyTickets';

import './DashboardController.css';

class DashboardController extends Component {

    componentWillMount() {
        axiosController.getUserInfo().then(userInfo => {
            this.props.updateCurrentUser(userInfo);
            this.props.updateNavBarText('Welcome, ' + this.props.user.name);
        });
    }

    render() {
        return (
            <div className="dashboard_container">
                <Switch>
                    {this.props.user.role === 'admin'
                        ?
                        <Route component={AdminDashboard} />
                        :
                        <Route component={UserDashboard} />}
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps, { updateCurrentUser, updateNavBarText })(DashboardController);