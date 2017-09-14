import React, { Component } from 'react';
import './UserDashboard.css';

import { Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../Home/Home';

class UserDashboard extends Component {
    render() {
        return (
            <div className='userdashboard_container'>
                <h1>Welcome USER, {this.props.user.username}</h1>
                    <Link to='/dashboard/submit-ticket'><button>Submit A Ticket</button></Link>
                    <Link to='/dashboard/my-tickets'><button>My Tickets</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(UserDashboard);