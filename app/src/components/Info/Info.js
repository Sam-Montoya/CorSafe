import React, { Component } from 'react';

// import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateNavBarText } from '../ducks/user-reducer';

import SideNavBar from '../SideNavBar';
import TopNavBar from '../TopNavBar';

import axiosController from '../../axiosController';

import User from '../../images/User.png';
import Email from '../../images/Email.png';
import List from '../../images/List.png';

import './Info.css';

class Info extends Component {
    constructor() {
        super();

        this.state = {
            resolvedTickets: 0,
            inProgressTickets: 0,
            notAnsweredTickets: 0,
            userRole: ''
        }
    }

    componentDidMount() {
        this.props.updateNavBarText('Your Info');

        this.setState({
            userRole: this.props.user.role[0].toUpperCase() + this.props.user.role.substr(1)
        })
        axiosController.getTicketCount(this.props.user.auth_id).then(data => {
            this.setState({
                resolvedTickets: data[0][0].count,
                inProgressTickets: data[1][0].count,
                notAnsweredTickets: data[2][0].count
            })
        });
    }

    render() {
        return (
            <div>
                <TopNavBar />
                <SideNavBar />

                <div className='info_container'>
                    <div className='info_overlay'>
                        <div>
                            <section className='info_profilepic'>
                                <img src={this.props.user.profilepic} alt='' />
                                <h1>{this.props.user.name}</h1>
                            </section>
                        </div>

                        <div className='info_usercontainer'>
                            <section className='info_username'>
                                <img src={User} alt='' />
                                <div>
                                    <h2>Username:</h2>
                                    <h1>{this.props.user.username}</h1>
                                </div>
                            </section>

                            <section className='info_username'>
                                <img src='http://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/512/user-info-icon.png' alt='' />
                                <div>
                                    <h2>Role:</h2>
                                    <h1>{this.state.userRole}</h1>
                                </div>
                            </section>

                            <section className='info_email'>
                                <img src={Email} alt='' />
                                <div>
                                    <h2>Email:</h2>
                                    <h1>{this.props.user.email}</h1>
                                </div>
                            </section>

                            <section className='info_tickets'>
                                <img src={List} alt='' />
                                <div>
                                    <section className='info_resolved'>Resolved</section>
                                    <h3>{this.state.resolvedTickets}</h3>
                                </div>
                                <div>
                                    <section className='info_inprogress'>In-Progress</section>
                                    <h3>{this.state.inProgressTickets}</h3>
                                </div>
                                <div>
                                    <section className='info_notanswered'>Not Answered</section>
                                    <h3>{this.state.notAnsweredTickets}</h3>
                                </div>
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

export default connect(mapStateToProps, { updateNavBarText })(Info);