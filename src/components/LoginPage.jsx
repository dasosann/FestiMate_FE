import React from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import kakaoLoginImg from '../assets/btn_kakao_login.png';
import appleLoginImg from '../assets/btn_apple_login.png';
import logo from '/assets/InfoPage/login-festimate-logo.svg'

const LoginPage = () => {
    const navigate = useNavigate();
    const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URL;
  
    const handleKakaoLogin = () => {  
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      window.location.href = kakaoAuthUrl;
    };
  
    return (
      <div className="login-container">
        <div className="login-content">
            <img src={logo} alt="FestiMate Logo" className="login-logo" />
            <p className="login-title">페스티벌에서 내 취향에 맞는 이상형 찾기</p>
            
            <div className="login-button-container">
                <button className="login-button" onClick={handleKakaoLogin}>
                    <img src={kakaoLoginImg} alt="카카오 로그인" className="login-img" />
                </button>
                {/* <button className="login-button">
                    <img src={appleLoginImg} alt="애플 로그인" className="login-img" />
                </button> */}
                <p className="privacy" onClick={() => window.open("https://psychedelic-perigee-94e.notion.site/1cbaebccb8e481bcb46febaa6e5f80a5?pvs=4")}>개인정보처리방침</p>
            </div>
        </div>
      </div>
    );
  };
  
export default LoginPage;