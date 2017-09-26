import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axiosController from '../../axiosController';

import './MyTickets.css';
import SideNavBar from '../SideNavBar.js';
import TopNavBar from '../TopNavBar.js';
import { updateNavBarText, updateUserTickets, updateFilteredTickets, updateButtonClass } from '../ducks/user-reducer';

import StatusMenu from '../SearchMenus/StatusMenu';
import TagMenu from '../SearchMenus/TagMenu';
import IdMenu from '../SearchMenus/IdMenu';
import DateMenu from '../SearchMenus/DateMenu';
import SearchField from '../SearchMenus/SearchField';

import moment from 'moment';

class MyTickets extends Component {

    componentDidMount() {
        this.props.updateNavBarText('Your Tickets');
        this.props.updateButtonClass('top-navbar-hidebutton');
        if (this.props.user.role === 'user') {
            axiosController.getUserTickets(this.props.user.auth_id).then(tickets => {
                this.props.updateUserTickets(tickets);
                this.props.updateFilteredTickets(tickets);
            })
        } else {
            axiosController.getAdminTickets('google-oauth2|108353722291765184973').then(adminTickets => {
                this.props.updateUserTickets(adminTickets);
                this.props.updateFilteredTickets(adminTickets);
            })
        }  
    }

    render() {
        let userTickets;
        if (this.props.user.userTickets) {
            userTickets = this.props.user.filteredTickets.map(function (ticket, i) {
                return (
                    <div className='mytickets_ticketcontainer' key={i}>
                        <section className='mytickets_idcontainer'>
                            <Link to={{ pathname: '/dashboard/ticket/', query: ticket.ticket_id }}>
                                <h1>{ticket.ticket_id}</h1></Link>
                        </section>

                        {ticket.status === 'Resolved'
                            ?
                            (
                                <section className='mytickets_resolved'>
                                    <h1>{ticket.status}</h1>
                                </section>
                            )
                            :
                            (ticket.status === 'Not Answered'
                                ?
                                (
                                    <section className='mytickets_notanswered'>
                                        <h1>{ticket.status}</h1>
                                    </section>
                                )
                                :
                                <section className='mytickets_inprogress'>
                                    <h1>{ticket.status}</h1>
                                </section>
                            )
                        }
                        <section className='mytickets_subjectcontainer'>
                            <Link to={{ pathname: '/dashboard/ticket/', query: ticket.ticket_id }} key={i}>
                                <h1>{ticket.subject}</h1></Link>
                        </section>

                        <section>
                            {ticket.tag === 'Critical'
                                ?
                                <h1 style={{ color: 'red' }}>{ticket.tag}</h1>
                                :
                                <h1>{ticket.tag}</h1>
                            }
                        </section>

                        <section>
                            <h1>{ticket.name}</h1>
                        </section>

                        <section>
                            <h1>{moment(ticket.date).fromNow()}</h1>
                        </section>
                    </div>
                )
            })
        }

        return (
            <div>
                <TopNavBar />
                <SideNavBar />
                <div className='mytickets_container'>
                    <div className='mytickets_search'>
                        <StatusMenu />
                        <TagMenu />
                        <IdMenu />
                        <DateMenu />
                        <SearchField />
                    </div>
                    <div className='mytickets_overlay'>
                        <div className='mytickets_ticketcontainer'>
                            <section className='mytickets_idcontainer'>
                                <h1>ID</h1>
                            </section>

                            <section>
                                <h1>Status</h1>
                            </section>

                            <section className='mytickets_subjectcontainer'>
                                <h1>Subject</h1>
                            </section>

                            <section>
                                <h1>Tag</h1>
                            </section>

                            <section>
                                <h1>Name</h1>
                            </section>

                            <section>
                                <h1>Time</h1>
                            </section>
                        </div>
                        {userTickets}
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

export default connect(mapStateToProps, { updateNavBarText, updateUserTickets, updateFilteredTickets, updateButtonClass })(MyTickets);