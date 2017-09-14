import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentUser } from '../ducks/user-reducer';

import axiosController from '../../axiosController';

import SideNavBar from '../SideNavBar';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import UserSettings from '../Settings/UserSettings';

import './DashboardController.css';

class DashboardController extends Component {

    componentDidMount() {
        axiosController.getUserInfo().then(res => {
            this.props.updateCurrentUser(res.data);
        });
    }

    render() {
        return (
            <div className='dashboard_background'>
                <Switch>
                    {this.props.user.role === "admin" 
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

export default connect(mapStateToProps, { updateCurrentUser })(DashboardController);