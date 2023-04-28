import React from 'react';
import "./Footer.scss";

const Footer = () => {
    return (
        <div className='footer'>
            <div className='movie-name'>Movie App</div>
            <div>&copy; {new Date().getFullYear()}, Movie, Inc. by React with Redux</div>
        </div>
    );
};

export default Footer;