import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import logo from '../assets/festimatelogo.png';
import kakaoLoginImg from '../assets/btn_kakao_login.png';
import appleLoginImg from '../assets/btn_apple_login.png';

const LoginPage = () => {
    const navigate = useNavigate();
  
    const handleLogin = () => {
      navigate('/enterFestival');
    };
  
    return (
      <div className="login-container">
        <div className="content">
          <p className="title">축제에서 이상형 찾기!<br/>내 취향에 맞는 매칭 서비스!</p>
          <img src={logo} alt="FestiMate Logo" className="logo" />
          <button className="login-button" onClick={handleLogin}>
            <img src={kakaoLoginImg} alt="카카오 로그인" className="login-img" />
          </button>
          <button className="login-button" onClick={handleLogin}>
            <img src={appleLoginImg} alt="애플 로그인" className="login-img" />
          </button>
          <p className="privacy">개인정보처리방침</p>
        </div>
      </div>
    );
  };
  
export default LoginPage;