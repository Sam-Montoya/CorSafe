import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home Screen!</h1>
                <a href={process.env.REACT_APP_LOGIN}><button>Log in</button></a>
            </div>
        )
    }
}