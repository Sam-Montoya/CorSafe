import React, { Component } from 'react';
import './TopNavBar.css';

import { connect } from 'react-redux';

class TopNavBar extends Component {
    constructor() {
        super();

        this.state = {

        }
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