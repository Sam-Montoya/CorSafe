import React, { Component } from 'react';
import './Carousel.css';

export default class Carousel extends Component {
    render() {
        return (
            <div className="bs-example">
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="item active">
                            <img src={'https://media.giphy.com/media/3o7aD675SFKJuVot0Y/giphy.gif'} alt="First Slide" style={{ width: '50vw', height: '50vh' }} />
                        </div>
                        <div className="item">
                            <img src={'https://media.giphy.com/media/3o7aDbr0SE0aFwligw/giphy.gif'} alt="Second Slide" style={{ width: '50vw', height: '50vh' }} />
                        </div>
                        <div className="item">
                            <img src={'https://media.giphy.com/media/3o7aDbr0SE0aFwligw/giphy.gif'} alt="Third Slide" style={{ width: '50vw', height: '50vh' }} />
                        </div>
                    </div>
                    <a className="carousel-control left" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                    </a>
                    <a className="carousel-control right" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </div>
            </div>
        )
    }
}