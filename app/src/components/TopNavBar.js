import React, { Component } from 'react';
import './TopNavBar.css';

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
                    <h1>cor<strong style={{ fontWeight: "bolder" }}>safe</strong></h1>
                </div>
                <div className="top-navbar-text">
                    <h1>Welcome, User</h1>
                </div>
            </div>
        )
    }
}

export default TopNavBar;