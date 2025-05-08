import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '/src/styles/MyPage/Navbar.css';
import arrow from '/assets/InfoPage/left-arrow.svg';

const Navbar = ({ currentPage, setCurrentPage }) => {
    const [title, setTitle] = useState('');
    const [isMainPage, setIsMainPage] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(location.pathname.includes('myprofile')) {
            setTitle('내 프로필');
            setIsMainPage(false);
        }
        else if(location.pathname.includes('editContact')) {
            setTitle('연락 정보 수정');
            setIsMainPage(false);
        }
        else if(location.pathname.includes('editMessage')) {
            setTitle('메세지 수정');
            setIsMainPage(false);
        }
        else if(location.pathname.includes('point')) {
            setTitle('포인트 내역');
            setIsMainPage(false);
        }
        else {
            setTitle('마이페이지');
            setIsMainPage(true); // 메인 마이페이지임을 표시
        }
    }, [location.pathname]);

    const handleArrowClick = () => {
        navigate(-1);
    };

    return (
        <div className={`navbar-container ${isMainPage ? 'main-page-navbar' : ''}`}>
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