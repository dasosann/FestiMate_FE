import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import kakaoLoginImg from '../assets/btn_kakao_login.png';
import appleLoginImg from '../assets/btn_apple_login.png';
import logo from '/assets/Main/festimate-logo.svg';

const LoginPage = () => {
    const navigate = useNavigate();
  
    const handleLogin = () => {
      navigate('/enterFestival');
    };
  
    return (
      <div className="login-container">
        <div className="login-content">
            <img src={logo} alt="FestiMate Logo" className="login-logo" />
            <p className="login-title">페스티벌에서 내 취향에 맞는 이상형 찾기</p>
            
            <div className="login-button-container">
                <button className="login-button" onClick={handleLogin}>
                    <img src={kakaoLoginImg} alt="카카오 로그인" className="login-img" />
                </button>
                <button className="login-button" onClick={handleLogin}>
                    <img src={appleLoginImg} alt="애플 로그인" className="login-img" />
                </button>
                <p className="privacy">개인정보처리방침</p>
            </div>
        </div>
      </div>
    );
  };
  
export default LoginPage;