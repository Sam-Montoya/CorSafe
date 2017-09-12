import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/user-reducer';

class UserDashboard extends Component {
    componentDidMount(){
        this.props.getUserInfo();
    }
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <h1>{this.props.user.username}</h1>
                <button onClick={() => this.props.username = 'tes'}>Test</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUserInfo})(UserDashboard);