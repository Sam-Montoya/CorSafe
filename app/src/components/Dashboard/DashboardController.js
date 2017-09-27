import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentUser, updateNavBarText, updateButtonClass } from '../ducks/user-reducer';

import axiosController from '../../axiosController';

import UserDashboard from './UserDashboard';
import MyTickets from '../Tickets/MyTickets';

import './DashboardController.css';

class DashboardController extends Component {

    componentDidMount() {
        axiosController.getUserInfo().then(userInfo => {
            this.props.updateCurrentUser(userInfo);
            if (this.props.user.role === 'user')
                this.props.updateNavBarText('Welcome, ' + this.props.user.name);
        });
        this.props.updateButtonClass('top-navbar-hidebutton');
    }

    render() {
        return (
            <div className="dashboard_container">
                <Switch>
                    {this.props.user.role === 'admin'
                        ?
                        <Redirect to='/dashboard/my-tickets' component={MyTickets} />
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

export default connect(mapStateToProps, { updateCurrentUser, updateNavBarText, updateButtonClass })(DashboardController);