import React, { Component } from 'react';

import './SubmitTicket.css';

import axiosController from '../../axiosController';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class SubmitTicket extends Component {
    constructor() {
        super();

        this.state = {
            auth_id: '',
            subject: '',
            status: 'Not Answered',
            tag: 'Normal',
            description: '',
            name: ''
        }
    }

    componentWillMount() {
        this.setState({
            auth_id: this.props.user.auth_id,
            name: this.props.user.name
        })
    }

    render() {
        return (
            <div className='submit-ticket_container'>
                <div className='submit-ticket_overlay'>
                    <div className='submit-ticket_topcontainer'>
                        <section className='submit-ticket_subjectcontainer'>
                            <h1>Subject</h1>
                            <input type='text' placeholder='Subject' ref='subjectField' onChange={(input) => this.setState({ subject: input.target.value })} />
                        </section>

                        <h1>Tag</h1>
                        <select value={this.state.tag} onChange={(selected) => this.setState({ tag: selected.target.value })}>
                            <option value='Normal'>Normal</option>
                            <option value='Critical'>Critical</option>
                        </select>
                    </div>

                    <section className='submit-ticket_bottomcontainer'>
                        <textarea rows='6' cols='50' placeholder='details of the problem' onChange={(input) => this.setState({ description: input.target.value })} />
                        <button className='submit' raised onClick={() => axiosController.createTicket(this.state)}>Submit</button>
                        <Link to='/dashboard'><button className='submitticket-cancelbutton' raised>Cancel</button></Link>
                    </section>
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

export default connect(mapStateToProps)(SubmitTicket);