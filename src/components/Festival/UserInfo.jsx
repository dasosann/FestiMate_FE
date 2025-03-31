import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '/src/styles/MyPage/InfoMenu.css';
import defaultProfile from '/assets/MyPage/default-profile.svg';
import arrow from '/assets/MyPage/arrow.svg';

const UserInfo = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const name="가대 고윤정";
    const accountBank = "국민은행";
    const accountNumber = "817202-04-045292";

    return (
        <div className="info-section-container">
            <div className="info-top-container">
                <div className="info-profile-box">
                    <img src={defaultProfile} className="info-profile-img" alt="프로필" />
                    <div className="info-name-box">
                        안녕하세요! <br /> <span className="point-color">{name}</span>님
                    </div>
                    <button className="info-modify-btn" onClick={() => navigate('myprofile')}>
                        프로필 수정
                    </button>
                </div>
                <div className="info-account-box">
                    <div className="account-num-box">
                        <div className="account-bank">{accountBank}</div>
                        <div className="account-num">
                            {accountNumber}
                        </div>
                    </div>
                </div>
            </div>
            <div className="divide-line"></div>
            <div className="info-bottom-container">
                <div className="info-bottom-menu" onClick={() => navigate('/mypage/point')}>
                    내 포인트 내역
                    <img src={arrow} className="info-arrow" alt="화살표" />
                </div>
                <div className="info-bottom-menu">
                    포인트 제도 소개
                    <img src={arrow} className="info-arrow" alt="화살표" />
                </div>
                <div className="info-bottom-menu">
                    문의하기
                    <img src={arrow} className="info-arrow" alt="화살표" />
                </div>
                <div className="info-bottom-menu">
                    개인정보처리방침
                    <img src={arrow} className="info-arrow" alt="화살표" />
                </div>
            </div>

            {/* 토스트 메시지 */}
            {showToast && (
                <div className="toast-message">
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

export default UserInfo;
