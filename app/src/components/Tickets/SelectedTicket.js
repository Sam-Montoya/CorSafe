import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import axiosController from '../../axiosController';

import './SelectedTicket.css';

class SelectedTicket extends Component {
    constructor() {
        super();

        this.state = {
            selectedTicket: {
                ticket_id: 33,
                subject: '',
                status: '',
                tag: '',
                description: '',
                date: '',
            },
            comments: []
        }
    }

    componentWillMount() {
        // this.setState({ticket_id: this.props.location.query})
        axiosController.getTicketById(33).then(ticketInfo => {
            this.setState({
                selectedTicket: ticketInfo.data[0]
            })
        });
        axiosController.getComments(33).then(comments => {
            console.log('Comments show: ', comments);
            console.log(comments.data[0].comments);
            this.setState({
                comments: comments.data[0].comments
            });
            console.log(this.state.comments);
        });
    }

    render() {
        // console.log(this.props.location.query);

        // console.log(this.state.selectedTicket);
        console.log(this.state.selectedTicket);
        let allComments = this.state.comments.map(function (data, i) {
            return (
                <div key={i}>
                    <h1>{data.comment}</h1>
                    <h1>{data.user_id}</h1>
                </div>
            )
        });

        return (
            <div className='selectedticket_container'>
                <h1>Selected Ticket</h1>
                <h1>{this.state.selectedTicket.ticket_id}</h1>
                <h1>{this.state.selectedTicket.subject}</h1>
                <h1>{this.state.selectedTicket.status}</h1>
                <h1>{this.state.selectedTicket.tag}</h1>
                <h1>{this.state.selectedTicket.description}</h1>
                <h1>{this.state.selectedTicket.date}</h1>
                <Link to='/dashboard/my-tickets'><button>Back</button></Link>
                {allComments}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(SelectedTicket);