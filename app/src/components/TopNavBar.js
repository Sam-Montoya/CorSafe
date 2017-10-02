import React, { Component } from 'react';
import './TopNavBar.css';
import './Tickets/SelectedTicket.css'
import { connect } from 'react-redux';
import axios from 'axios';
import { createHashHistory } from 'history'

class TopNavBar extends Component {
    
    componentWillMount() {
        axios.get('/auth/authorized').then(user => {
            if (!user.data) {
                createHashHistory().push('/');
            }
        });
    }

    render() {
        return (
            <div className="top-navbar">
                <div className="top-navbar-logo">
                    <h1 style={{ fontWeight: "light" }}>cor<strong style={{ fontWeight: "bolder" }}>safe</strong></h1>
                </div>
                <div className="top-navbar-text">
                    <h1>{this.props.user.navText}</h1>
                </div>
                <section className='top-navbar-ticketstatus'>
                    <section className={this.props.user.buttonClass}>{this.props.user.buttonStatus}</section>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(TopNavBar);