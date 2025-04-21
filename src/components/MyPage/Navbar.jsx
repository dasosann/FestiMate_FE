import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '/src/styles/MyPage/Navbar.css';
import arrow from '/assets/InfoPage/left-arrow.svg';

const Navbar = ({ currentPage, setCurrentPage }) => {
    const [title, setTitle] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        setTitle('마이페이지');
    }, [location.pathname]);

    const handleArrowClick = () => {
        navigate(-1);
    };

    return (
        <div className="navbar-container">
            <img 
                src={arrow} 
                className="left-arrow" 
                onClick={handleArrowClick}
                alt="왼쪽 화살표"
            />
            <div className="mypage-title"> 
                {title}
            </div>
        </div>
    );
};

export default Navbar;
