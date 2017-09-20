import React, { Component } from 'react';
import './UserDashboard.css';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import plus from '../../images/CorSafePlus.png';
import ticketList from '../../images/TicketList.png';

import SideNavBar from '../SideNavBar.js';
import TopNavBar from '../TopNavBar.js';

class UserDashboard extends Component {
    render() {
        return (
            <div>
                <TopNavBar />
                <SideNavBar />
                <div className='userdashboard_container'>
                    <div className="userdashboard_overlay">
                        <div>
                            <Link to='/dashboard/submit-ticket'>
                                <div className='userdashboard_buttoncontainers'>
                                    <img className='container_images' src={plus} alt='' />
                                </div>
                                <button className='user_buttons'>Submit A Ticket</button>
                            </Link>
                        </div>

                        <div>
                            <Link to='/dashboard/my-tickets'>
                                <div className='userdashboard_buttoncontainers'>
                                    <img className='container_images' src={ticketList} alt='' />
                                </div>
                                <button className='user_buttons'>My Tickets</button>
                            </Link>
                        </div>
                    </div>
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

export default connect(mapStateToProps)(UserDashboard);