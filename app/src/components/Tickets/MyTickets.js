import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axiosController from '../../axiosController';

import './MyTickets.css';
import SideNavBar from '../SideNavBar.js';
import TopNavBar from '../TopNavBar.js';
import { updateNavBarText } from '../ducks/user-reducer';

import moment from 'moment';

class MyTickets extends Component {
    constructor() {
        super();

        this.state = {
            userTickets: []
        }
    }

    componentWillMount() {
        axiosController.getUserTickets(this.props.user.auth_id).then(tickets => {
            this.setState({
                userTickets: tickets
            })
        })
        this.props.updateNavBarText('Your Tickets');
    }

    render() {
        let userTickets;
        if (this.state.userTickets) {
            userTickets = this.state.userTickets.map(function (ticket, i) {
                return (
                    <div className='mytickets_ticketcontainer'>
                        <section className='mytickets_idcontainer'>
                            <Link to={{ pathname: '/dashboard/ticket/', query: ticket.ticket_id }} key={i}>
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
                            <h1>{ticket.tag}</h1>
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
                        <h1>Search Preferences</h1>
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

export default connect(mapStateToProps, { updateNavBarText })(MyTickets);