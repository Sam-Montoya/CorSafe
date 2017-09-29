import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SideNavBar.css';

export default class SideNavBar extends Component {
    render() {
        return (
            <div className='nav_container'>
                <div className='sidenav_container'>
                    <div>
                        <Link to='/dashboard'>
                            <section>
                                <span /><h1>Home</h1>
                            </section>
                        </Link>
                    </div>
                    <div>
                        <Link to='/dashboard/help'>
                            <section>
                                <span /><h1>My Info</h1>
                            </section>
                        </Link>
                    </div>
                    <div>
                        <a href={process.env.REACT_APP_LOGOUT}>
                            <section>
                                <span />Logout
                        </section>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}