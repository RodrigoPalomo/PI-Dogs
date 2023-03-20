import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';

const Landing= () => {
    return (
        <div className="mainContainer-landingPage">
            <div>¡Bienvenidos a la página de perritos!</div>
            <Link to="/home">
                <button className="button-landingPage">Enter</button>
            </Link>
        </div>
    );
}

export default Landing;