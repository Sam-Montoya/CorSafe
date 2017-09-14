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
                // name: 'Wheatly Montoya',
                // profile_pic: 'https://lh4.googleusercontent.com/-XjsOddNmPZY/AAAAAAAAAAI/AAAAAAAAAzQ/oQ9N0Fxszis/photo.jpg',
                // auth_id: 'google-oauth2|108353722291765184973',
                // comment: ''
                name: '',
                profile_pic: '',
                auth_id: '',
                comment: ''
            },
            comments: []

            // let comment = {
            //     "ticket_id": "33",
            //     "name": "Sam Montoya",
            //     "profile_pic": "https://lh4.googleusercontent.com/-XjsOddNmPZY/AAAAAAAAAAI/AAAAAAAAAzQ/oQ9N0Fxszis/photo.jpg",
            //     "auth_id": "google-oauth2|108353722291765184973",
            //     "comment": "A comment from Code"
            // }
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
            if (ticketInfo.data[0]) {
                this.setState({
                    selectedTicket: ticketInfo.data[0]
                })
            }
        });
        axiosController.getComments(this.props.location.query).then(comments => {
            console.log(comments.data[0])
            if (comments.data[0]) {
                this.setState({
                    comments: comments.data[0].comments
                });
            }
        });
    }

    updateComments() {
        axiosController.getComments(this.props.location.query).then(comments => {
            console.log('GET COMMENT   ', comments)
            this.setState({
                comments: comments.data[0].comments
            });
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
        axiosController.postComment(this.state.postComment).then(() => {
            this.updateComments();
        });
        
        document.getElementById('submitarea').value = '';
        console.log(this.props)

        console.log('state check: ', this.state.selectedTicket);
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