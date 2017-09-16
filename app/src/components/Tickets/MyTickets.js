import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axiosController from '../../axiosController';

import './MyTickets.css';

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
    }

    render() {
        let userTickets;
        if (this.state.userTickets) {
            userTickets = this.state.userTickets.map(function (ticket, i) {
                return (
                    <Link to={{ pathname: '/dashboard/ticket/', query: ticket.ticket_id }} key={i}>
                        <div>
                            <h1>{ticket.ticket_id}</h1>
                            <h1>{ticket.status}</h1>
                            <h1>{ticket.subject}</h1>
                            <h1>{ticket.tag}</h1>
                            <h1>{ticket.description}</h1>
                            <h1>{ticket.date}</h1>
                        </div>
                    </Link>
                )
            })
        }

        return (
            <div className='mytickets_container'>
                <h1>Tickets For {this.props.user.username}</h1>
                {userTickets}
                <Link to='/dashboard'><button>Cancel</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(MyTickets);