import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import axiosController from '../../axiosController';

import TopNavBar from '../TopNavBar';
import SideNavBar from '../SideNavBar';

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
        this.setState({
            postComment: commentValue
        })
    }

    postComment() {
        if (this.state.selectedTicket.ticket_id === 0) {
            alert('No Valid Ticket Selected')
        } else {
            axiosController.postComment(this.state.postComment).then(() => {
                this.updateComments();
            });

            document.getElementById('submitarea').value = '';
        }
    }

    updateTicketStatus(newStatus) {
        axiosController.updateTicketStatus(this.state.selectedTicket.ticket_id, newStatus).then(response => {
            alert(response);
            this.updateTicketInfo();
        })
    }

    render() {
        var allComments;
        if (this.state.comments) {
            allComments = this.state.comments.map(function (data, i) {
                return (
                    <div className='comment_container' key={i}>
                        <h1>{data.name}</h1>
                        <img className='comment_profilepic' src={data.profile_pic} alt='' />
                        <h1>{data.comment}</h1>
                        <h1>{data.user_id}</h1>
                    </div>
                )
            });
        }

        return (
            <div>
                <TopNavBar />
                <SideNavBar />
                <div className='submit-ticket_container'>
                    <div className='selectedticket_overlay'>
                        <div className='submit-ticket_ticketcontents'>
                            <div className='submit-ticket_topcontainer'>
                                <section className='submit-ticket_subjectcontainer'>
                                    <h1>Subject</h1>
                                    <input type='text' value={this.state.selectedTicket.subject} disabled />
                                </section>

                                <section className='submit-ticket_tagcontainer'>
                                    <h1>Tag</h1>
                                    <input type='text' value={this.state.selectedTicket.tag} disabled />
                                </section>
                            </div>

                            <section className='submit-ticket_bottomcontainer'>
                                <h1>Description</h1>
                                <textarea rows='6' cols='50' value={this.state.selectedTicket.description} disabled />
                            </section>
                        </div>

                        <div className='selected-ticket_comments'>
                            {allComments}

                            <textarea rows='6' cols='50' placeholder='details of the problem' id='submitarea' onChange={(input) => this.updateCommentBox(input.target.value)} />
                            <button onClick={() => this.postComment()}>Comment</button>
                        </div>
                    </div>
                </div>
            </div>


            // <div className='selectedticket_container'>
            //     <div className='selectedticket_overlay'>
            //         {/* <h1>{this.state.selectedTicket.ticket_id}</h1>
            //         <h1>{this.state.selectedTicket.status}</h1> */}
            //         <h1>Submitted By: {this.state.selectedTicket.name}</h1>
            //         <section className='selectedticket-topcontainer'>
            //             <section className='selectedticket-subject'>
            //                 <h1>Subject: {this.state.selectedTicket.subject}</h1>
            //                 {/* <section className='selectedticket-subjectField'>
            //                     <h1>{this.state.selectedTicket.subject}</h1>
            //                 </section> */}
            //             </section>
            //             <section className='selectedticket-tag'>
            //                 <h1>Tag: {this.state.selectedTicket.tag}</h1>
            //                 {/* <section className='selectedticket-tagField'>
            //                     <h1>{this.state.selectedTicket.tag}</h1>
            //                 </section> */}
            //             </section>
            //         </section>

            //         <section className='selectedticket-bottomcontainer'>
            //             <h1>{this.state.selectedTicket.description}</h1>
            //             <h1>{this.state.selectedTicket.date}</h1>
            //         </section>

            //         {this.props.user.role === 'user'
            //             ?
            //             (<Link to='/dashboard/my-tickets'><button>Back</button></Link>)
            //             :
            //             (
            //                 <div>
            //                     <button onClick={() => this.updateTicketStatus('Resolved')}>Resolved</button>
            //                     <button onClick={() => this.updateTicketStatus('In-Progress')}>In-Progress</button>
            //                     <button onClick={() => this.updateTicketStatus('Not Answered')}>Not Answered</button>
            //                     <Link to='/dashboard'><button>Cancel</button></Link>
            //                 </div>
            //             )
            //         }

            //         {allComments}

            //         <textarea rows='6' cols='50' placeholder='details of the problem' id='submitarea' onChange={(input) => this.updateCommentBox(input.target.value)} />
            //         <button onClick={() => this.postComment()}>Comment</button>
            //     </div>
            // </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(SelectedTicket);