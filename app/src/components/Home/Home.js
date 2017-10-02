import React, { Component } from 'react';
import Carousel from './Carousel';
import TerminalImage from '../../images/Terminal.png';
import ClockImage from '../../images/Clock.png';
import ChartImage from '../../images/Improve.png';
import './Home.css';
import moment from 'moment';

export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            contactText: ''
        }
    }

    render() {

        return (
            <div className='home_container'>
                <section className='home_header'>
                    <h1 style={{ fontWeight: "light" }}>cor<strong style={{ fontWeight: "bolder" }}>safe</strong></h1>

                    <section className='home_header_right'>
                        <a onClick={() => document.getElementById('whyus').scrollIntoView()}>Why Us</a>
                        <a onClick={() => document.getElementById('contactme').scrollIntoView()}>Contact</a>
                        <a href={process.env.REACT_APP_LOGIN}><button>Log In</button></a>
                    </section>
                </section>

                <div className='home_body'>

                    <div className='home_mainimage'>
                        <section className='home_maincontents'>
                            <h1>CorSafe</h1>
                            <h3>A simple tool for help desk.</h3>
                            <a href={process.env.REACT_APP_LOGIN}><button>Free Sign Up</button></a>
                        </section>
                    </div>

                    <div className='home_gifcontainer'>
                        <h1>Support Made Easier</h1>
                        <section className='home_gifs'>
                            <Carousel />
                        </section>
                    </div>

                    <section id='whyus' className='home_whyuscontainer'>
                        <div className='home_whyustext'>
                            <h2>Why Us?</h2>
                            <h1>Simplicity</h1>
                        </div>
                    </section>

                    <section className='home_reasonscontainer'>
                        <div className='home_reason_1'>
                            <img src={TerminalImage} alt='' />
                            <h2>We develop our software to be user friendly.</h2>
                        </div>

                        <div className='home_reason_2'>
                            <h2>Get your problems solved faster.</h2>
                            <img src={ClockImage} alt='' />
                        </div>

                        <div className='home_reason_3'>
                            <img src={ChartImage} alt='' />
                            <h2>Free service, forever.</h2>
                        </div>
                    </section>

                    <section className='home_bottomcontainer'>
                        <a href={process.env.REACT_APP_LOGIN}><button>Create Free Account</button></a>
                    </section>

                    <div id='contactme' className='home_contactcontainer'>
                        <section>
                            <h1>Contact</h1>
                        </section>

                        <div className='home_contactsquares'>
                            <a target="_blank" rel='noopener noreferrer' href='https://github.com/Sam-Montoya?tab=repositories'><section className='home_github'>
                                <i className="fa fa-github fa-5x" aria-hidden="true" />
                            </section></a>

                            <section className='home_email' onClick={() => this.setState({ contactText: 'samuel.montoya1073@gmail.com' })}>
                                <i className="fa fa-envelope-o fa-5x" aria-hidden="true" />
                            </section>

                            <section className='home_phone' onClick={() => this.setState({ contactText: '801-879-7527' })}>
                                <i className="fa fa-phone fa-5x" aria-hidden="true" />
                            </section>

                            <a target="_blank" rel='noopener noreferrer' href='https://www.facebook.com/wheatly.montoya'><section className='home_facebook'>
                                <i className="fa fa-facebook fa-5x" aria-hidden="true" />
                            </section></a>
                        </div>

                        {this.state.contactText
                            ?
                            <h1 className='contact_text'>{this.state.contactText}</h1>
                            :
                            <h1 className='contact_text2'>{this.state.contactText}</h1>
                        }
                    </div>
                </div>
            </div>
        )
    }
}