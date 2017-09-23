import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import UserSettings from './Settings/UserSettings'
import './SideNavBar.css';

export default class SideNavBar extends Component {
    render() {
        return (
            <div className='nav_container'>
                <div className='sidenav_container'>
                    <div>
                        <section>
                            <span /><Link to='/dashboard'><h1>Home</h1></Link>
                        </section>
                    </div>
                    <div>
                        <section>
                            <span /><Link to='/dashboard/help'><h1>Help</h1></Link>
                        </section>
                    </div>
                    <div>
                        <section>
                            <span /><Link to='/dashboard/settings'><h1>Settings</h1></Link>
                        </section>
                    </div>
                    <div>
                        <section>
                            <span /><a href={process.env.REACT_APP_LOGOUT}>Logout</a>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}