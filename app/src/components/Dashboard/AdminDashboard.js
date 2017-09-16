import React, { Component } from 'react';
import { updateCurrentUser } from '../ducks/user-reducer';
import { connect } from 'react-redux';
import axiosController from '../../axiosController';
import { Link } from 'react-router-dom';

import './AdminDashboard.css';

class AdminDashboard extends Component {
    constructor() {
        super();

        this.state = {
            adminTickets: []
        }
    }

    componentDidMount() {
        axiosController.getUserInfo().then(res => {
            this.props.updateCurrentUser(res);
        })
        axiosController.getAdminTickets('google-oauth2|108353722291765184973').then(adminTickets => {
            this.setState({
                adminTickets: adminTickets
            })
        })
    }

    render() {
        let adminTickets;
        if (this.state.adminTickets) {
            adminTickets = this.state.adminTickets.map(function (ticket, i) {
                return (
                        <Link to={{ pathname: '/dashboard/ticket', query: ticket.ticket_id }} key={i}>
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
            <div className='admindashboard_container'>
                <h1>Welcome ADMIN, {this.props.user.username}</h1>
                {adminTickets}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps, { updateCurrentUser })(AdminDashboard);