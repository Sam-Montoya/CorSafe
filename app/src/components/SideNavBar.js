import React, { Component } from 'react';
import { Switch, Link } from 'react-router-dom';
import UserSettings from './Settings/UserSettings'
import './SideNavBar.css';

export default class SideNavBar extends Component {
    render() {
        return (
            <div className='sidenav_container'>
                <Link to='/dashboard'><h1>Home</h1></Link>
                <Link to='/dashboard/help'><h1>Help</h1></Link>
                <Link to='/dashboard/settings'><h1>Settings</h1></Link>
                <a href={process.env.REACT_APP_LOGOUT}><h1>Logout</h1></a>
            </div>
        )
    }
}