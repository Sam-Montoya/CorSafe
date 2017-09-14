import React, { Component } from 'react';
import { updateCurrentUser } from '../ducks/user-reducer';
import { connect } from 'react-redux';
import axiosController from '../../axiosController';
import { Switch, Route, Link } from 'react-router-dom';
import UserSettings from '../Settings/UserSettings';

class AdminDashboard extends Component {
    componentDidMount() {
        axiosController.getUserInfo().then(res => {
            this.props.updateCurrentUser(res.data);
        });
    }
    render() {
        return (
            <div className='admindashboard_container'>
                <h1>Welcome ADMIN, {this.props.user.username}</h1>
                <Switch>
                    <Route to='/settings' component={UserSettings} />
                    <Route to='/my-tickets' />
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

export default connect(mapStateToProps, { updateCurrentUser })(AdminDashboard);