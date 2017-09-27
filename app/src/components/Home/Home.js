import React, { Component } from 'react';
import Carousel from './Carousel';
import TerminalImage from '../../images/Terminal.png';
import ClockImage from '../../images/Clock.png';
import ChartImage from '../../images/Improve.png';
import './Home.css';
export default class Home extends Component {
    render() {
        return (
            <div className='home_container'>
                <section className='home_header'>
                    <h1 style={{ fontWeight: "light" }}>cor<strong style={{ fontWeight: "bolder" }}>safe</strong></h1>

                    <section className='home_header_right'>
                        <h2>Why Us</h2>
                        <h2>Contact</h2>
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

                    <section className='home_whyuscontainer'>
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
                </div>
            </div>
        )
    }
}