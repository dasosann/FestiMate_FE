import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '/src/styles/MyPage/Navbar.css';
import arrow from '/assets/InfoPage/left-arrow.svg';
import setting from '/assets/InfoPage/setting.svg';

const Navbar = ({ festivalId }) => {
    const [title, setTitle] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(location.pathname === '/mypage' || location.pathname === '/mypage/') {
            setTitle('마이페이지');
        }
        else if(location.pathname === '/mypage/myprofile' || location.pathname === '/mypage/myprofile/') {
            setTitle('내 프로필');
        }
    }, [location.pathname]);

    const handleArrowClick = () => {
        if(location.pathname === '/mypage' || location.pathname === '/mypage/') {
            navigate('/festival');
        } else if(location.pathname === '/mypage/myprofile' || location.pathname === '/mypage/myprofile/') {
            navigate('/mypage');
        } else {
            navigate('/mainpage');
        }
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
            <img 
                src={setting}
                className="setting-icon"
                onClick={() => navigate(`/festival/${festivalId}/mypage`)}
            />
        </div>
    );
};

export default Navbar;
