import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import axiosController from '../../axiosController';
import moment from 'moment';

import TopNavBar from '../TopNavBar';
import SideNavBar from '../SideNavBar';
import { updateNavBarText, updateButtonStatus, updateButtonClass } from '../ducks/user-reducer';

import AlertDelete from '../AlertDelete';
import AlertTickets from '../AlertTickets';

import './SelectedTicket.css';
import './SubmitTicket';

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
                name: ''
            },
            postComment: {
                ticket_id: 0,
                name: '',
                profile_pic: '',
                auth_id: '',
                comment: '',
                timeSubmitted: ''
            },
            comments: [],
            isOpen: false,
            ticketMessage: ''
        }
        this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
        let commentInfo = {
            ticket_id: this.props.location.query,
            name: this.props.user.name,
            profile_pic: this.props.user.profilepic,
            auth_id: this.props.user.auth_id,
            comment: '',
            timeSubmitted: ''
        }
        this.setState({
            postComment: commentInfo
        })

        axiosController.getTicketById(this.props.location.query).then(ticketInfo => {
            if (ticketInfo[0]) {
                this.setState({
                    selectedTicket: ticketInfo[0]
                })
                this.props.updateNavBarText('Ticket #' + ticketInfo[0].ticket_id);
                this.updateNavButton(ticketInfo[0].status)

                if(ticketInfo[0].notification){
                    axiosController.updateNotificationStatus(ticketInfo[0].ticket_id, false).then(response => {
                        
                    })
                }
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

    updateTicketInfo() {
        axiosController.getTicketById(this.props.location.query).then(ticketInfo => {
            if (ticketInfo[0]) {
                this.setState({
                    selectedTicket: ticketInfo[0]
                })
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
        commentValue.timeSubmitted = new Date(Date.now());
        this.setState({
            postComment: commentValue
        })
    }

    postComment() {
        if (this.state.selectedTicket.ticket_id === 0) {
            alert('No Valid Ticket Selected')
        } else {
            if (this.props.user.auth_id) {
                axiosController.postComment(this.state.postComment).then(() => {
                    this.updateComments();
                    axiosController.updateNotificationStatus(this.state.selectedTicket.ticket_id, true).then(response => {
                        console.log(response);
                    });
                });
                document.getElementById('submitarea').value = '';
            } else {
                alert('Not Logged In!');
            }
        }
    }

    updateTicketStatus(newStatus) {
        axiosController.updateTicketStatus(this.state.selectedTicket.ticket_id, newStatus).then(response => {
            this.updateTicketInfo();
            this.updateNavButton(newStatus);
            this.setState({
                isOpen: true,
                ticketMessage: response
            })
        })
    }

    updateNavButton(status) {
        this.props.updateButtonStatus(status);
        if (status === 'Resolved')
            this.props.updateButtonClass('top-navbar-button-resolved');
        else if (status === 'Not Answered')
            this.props.updateButtonClass('top-navbar-button-notanswered');
        else
            this.props.updateButtonClass('top-navbar-button-inprogress');
    }

    render() {
        let allComments;
        if (this.state.comments) {
            allComments = this.state.comments.map(function (data, i) {
                return (
                    <div className='comment_container' key={i}>
                        <div style={{display: 'flex'}}>
                            <section className='comment_userinfo'>
                                <img className='comment_profilepic' src={data.profile_pic} alt='' />
                                <h2>{data.name}</h2>
                            </section>

                            <section className='comment_commentconainer'>
                                <h2>{data.comment}</h2>
                            </section>
                        </div>

                        <section className='comment_time'>
                            <h3>{moment(data.timeSubmitted).fromNow()}</h3>
                        </section>
                    </div>
                )
            });
        }

        return (
            <div>
                <TopNavBar />
                <SideNavBar />
                <div className='selectedticket_container'>
                    <div className='selectedticket_overlay'>
                        <AlertTickets isOpen={this.state.isOpen} message={this.state.ticketMessage} />
                        <div className='selected-ticket_ticketcontents'>
                            <div className='submit-ticket_topcontainer'>
                                <section className='submit-ticket_subjectcontainer'>
                                    <h1>Subject</h1>
                                    <input style={{backgroundColor: 'rgb(250, 250, 250)'}} type='text' value={this.state.selectedTicket.subject} disabled />
                                </section>

                                <section className='submit-ticket_tagcontainer'>
                                    <h1>Tag</h1>
                                    <input style={{backgroundColor: 'rgb(250, 250, 250)'}} type='text' value={this.state.selectedTicket.tag} disabled />
                                </section>
                            </div>

                            <section className='submit-ticket_bottomcontainer'>
                                <h1>Description</h1>
                                <textarea style={{backgroundColor: 'rgb(250, 250, 250)'}} rows='6' cols='50' value={this.state.selectedTicket.description} disabled />
                            </section>

                            <section>
                                {this.props.user.role === 'user'
                                    ?
                                    (
                                        <section className='cancelbutton_container'>
                                            <Link to='/dashboard/my-tickets'><button className='submit-ticket_buttoncontainer_cancel'>Back</button></Link>
                                        </section>
                                    )
                                    :
                                    (
                                        <div className='selectedticket_buttons'>
                                            <section className='adminbuttons_container'>
                                                <button className='selectedticket_resolved' onClick={() => this.updateTicketStatus('Resolved')}>Resolved</button>
                                                <button className='selectedticket_inprogress' onClick={() => this.updateTicketStatus('In-Progress')}>In-Progress</button>
                                                <AlertDelete ticket={this.state.selectedTicket} />
                                            </section>

                                            <section className='selectedticket_cancelbutton'>
                                                <Link to='/dashboard/my-tickets'><button>Back</button></Link>
                                            </section>
                                        </div>
                                    )
                                }
                            </section>
                        </div>


                        <div className='selected-ticket_comments'>
                            {allComments}
                            <div className='add_comment_container'>
                                <section className='comment_userinfo'>
                                    <img className='comment_profilepic' src={this.props.user.profilepic} alt='' />
                                </section>

                                <textarea placeholder='Enter a comment...' id='submitarea' onChange={(input) => this.updateCommentBox(input.target.value)} className='comment_commentconainer' />
                            </div>
                            <section className='selectedticket-submitcontainer'>
                                <button className='selected-ticket_commentbutton' onClick={() => this.postComment()}>Comment</button>
                            </section>
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

export default connect(mapStateToProps, { updateNavBarText, updateButtonStatus, updateButtonClass })(SelectedTicket);