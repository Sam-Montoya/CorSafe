import React, { Component } from 'react';

import { Switch, Link } from 'react-router-dom';
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
                userTickets: tickets.data
            })
        })
    }

    render() {
        let userTickets = this.state.userTickets.map(function (data, i) {
            return (
                <div key={i}>
                    <Link to={{pathname: '/dashboard/ticket/', query: data.ticket_id}}><h1>{data.ticket_id}</h1></Link>
                    <h1>{data.status}</h1>
                    <h1>{data.subject}</h1>
                    <h1>{data.tag}</h1>
                    <h1>{data.description}</h1>
                    <h1>{data.date}</h1>
                </div>
            )
        });
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