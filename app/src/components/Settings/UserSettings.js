import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentUser } from '../ducks/user-reducer';

import axiosController from '../../axiosController';

class UserSettings extends Component {

    componentDidMount() {
        axiosController.getUserInfo().then(res => {
            this.props.updateCurrentUser(res.data);
        });
    }

    render() {
        return (
            <div>
                <h1>HELLLLLLLLLLLLLLLLLLLLLLO</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps, { updateCurrentUser })(UserSettings);