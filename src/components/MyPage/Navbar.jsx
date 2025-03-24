import React, { useState } from 'react';
import '/src/styles/InfoPage/Navbar.css';
import arrow from '/assets/InfoPage/left-arrow.svg';

const Navbar = ({currentPage, setCurrentPage}) => {

    return (
        <div className="navbar-container">
            <img src={arrow} className="left-arrow" onClick={() => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev))}/>
            <div className="all-progress"> 
            </div>
        </div>
    );
};

export default Navbar;
