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
                            <img src={'https://lh6.googleusercontent.com/DnD16CbOyA84BnE1oybKvWZGQ95icWJGvTBy4Pba0AJNNfOrar1-cVi6dvJmjPsgBrgXfBRQXgO9Uvs=w1918-h983-rw'} alt="First Slide" style={{ width: '50vw', height: '50vh' }} />
                        </div>
                        <div className="item">
                            <img src={'https://lh6.googleusercontent.com/0vwwZuoIvWRvl4Z_xNv4U9Itwhcvj-dtln6WsnWRaCOai6At97Mq39MlMjMKuFGRdDfM7lHvsG38-ek=w1918-h983-rw'} alt="Second Slide" style={{ width: '50vw', height: '50vh' }} />
                        </div>
                        <div className="item">
                            <img src={'https://lh6.googleusercontent.com/aHxUvox08N3E5dpEgWbvtzV6IlO07_fCtF9bRYKKmkG3UGDs_4NI4r8-3rdVGlBncogKuaVbqQOiOhw=w1918-h983'} alt="Third Slide" style={{ width: '50vw', height: '50vh' }} />
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