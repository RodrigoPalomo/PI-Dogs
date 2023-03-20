import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';
import logoLanding from './logo.png'

const Landing = () => {
    return (
        <>
            <div className="mainContainer-landingPage">
                <h1 className="title-LandingPage">¡Bienvenidos a la página de perritos!</h1>
                <img src={logoLanding} alt="logo" className="img-LandingPage" />
            </div>
            <Link className="a-LandingPage" to="/home">
                <button className="button-landingPage">Enter</button>
            </Link>
        </>

    );
}

export default Landing;