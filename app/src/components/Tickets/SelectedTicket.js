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
                ticket_id: 0,
                subject: '',
                status: '',
                tag: '',
                description: '',
                date: '',
            },
            postComment: {
                ticket_id: 0,
                name: '',
                profile_pic: '',
                auth_id: '',
                comment: ''
            },
            comments: []
        }
        this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
        let commentInfo = {
            ticket_id: this.props.location.query,
            name: this.props.user.name,
            profile_pic: this.props.user.profilepic,
            auth_id: this.props.user.auth_id,
            comment: ''
        }
        this.setState({
            postComment: commentInfo
        })

        axiosController.getTicketById(this.props.location.query).then(ticketInfo => {
            if (ticketInfo[0]) {
                this.setState({
                    selectedTicket: ticketInfo[0]
                })
            }
        });
        axiosController.getComments(this.props.location.query).then(comments => {
            if (comments[0]) {
                this.setState({
                    comments: comments[0].comments
                });
            }
        });
    }

    updateComments() {
        axiosController.getComments(this.props.location.query).then(comments => {
            if (comments[0]) {
                this.setState({
                    comments: comments[0].comments
                });
            }
        });
    }

    updateCommentBox(input) {
        let commentValue = Object.assign({}, this.state.postComment);
        commentValue.comment = input;
        this.setState({
            postComment: commentValue
        })
    }

    postComment() {
        if (this.state.ticket_id === 0) {

        } else {
            axiosController.postComment(this.state.postComment).then(() => {
                this.updateComments();
            });

            document.getElementById('submitarea').value = '';
        }
    }

    render() {
        var allComments;
        if (this.state.comments) {
            allComments = this.state.comments.map(function (data, i) {
                return (
                    <div key={i}>
                        <h1>{data.name}</h1>
                        <img className='comment_profilepic' src={data.profile_pic} alt='' />
                        <h1>{data.comment}</h1>
                        <h1>{data.user_id}</h1>
                    </div>
                )
            });
        }

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

                <textarea rows='6' cols='50' placeholder='details of the problem' id='submitarea' onChange={(input) => this.updateCommentBox(input.target.value)} />
                <button onClick={() => this.postComment()}>Comment</button>
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