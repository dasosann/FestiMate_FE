import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SplashScreen.css'; 
import logo from '/src/assets/festimate-logo.svg';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="content">
        <p className="title">축제에서 이상형 찾기!<br/>내 취향에 맞는 매칭 서비스!</p>
        <img src={logo} alt="FestiMate Logo" className="logo" />
      </div>
    </div>
  );
};

export default SplashScreen;
