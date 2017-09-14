import React, { Component } from 'react';

import './SubmitTicket.css';

import axios from 'axios'
import axiosController from '../../axiosController';

import { Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SubmitTicket extends Component {
    constructor() {
        super();

        this.state = {
            auth_id: '',
            subject: '',
            status: 'Not Answered',
            tag: 'normal',
            description: ''
        }
    }

    componentWillMount() {
        this.setState({
            auth_id: this.props.user.auth_id
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className='submit-ticket_container'>
                <h1>MY FRICKIN TICKETS</h1>
                <h1>Subject</h1>
                <input type='text' placeholder='Subject' ref='subjectField' onChange={(input) => this.setState({ subject: input.target.value })} />

                <h1>Tag</h1>
                <select value={this.state.tag} onChange={(selected) => this.setState({ tag: selected.target.value })}>
                    <option value='normal'>Normal</option>
                    <option value='critical'>Critical</option>
                </select>

                <textarea rows='6' cols='50' placeholder='details of the problem' onChange={(input) => this.setState({ description: input.target.value })} />
                <button onClick={() => axiosController.createTicket(this.state)}>Submit</button>
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

export default connect(mapStateToProps)(SubmitTicket);