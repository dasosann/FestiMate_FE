import React, { useState } from 'react';
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import '/src/styles/MyPage/InfoMenu.css';
import defaultProfile from '/assets/MyPage/default-profile.svg';
import copyBtn from '/assets/MyPage/copy-btn.svg';
import arrow from '/assets/MyPage/arrow.svg';

const InfoMenu = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const name="가대 고윤정";
    const accountBank = "국민은행";
    const accountNumber = "817202-04-045292";

    const copyAccountNumber = () => {
        const textToCopy = accountBank + " " + accountNumber;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setToastMessage("계좌번호가 복사되었습니다.");
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 2000);
            })
            .catch(err => {
                console.error("복사 실패:", err);
            });
    };

    return (
        <div className="info-section-container">
            <div className="info-top-container">
                <div className="info-profile-box">
                    <img src={defaultProfile} className="info-profile-img" alt="프로필" />
                    <div className="info-name-box">
                        안녕하세요! <br /> <span className="point-color">{name}</span>님
                    </div>
                    <button className="info-modify-btn">프로필 수정</button>
                </div>
                <div className="info-account-box">
                    <div className="account-num-box">
                        <div className="account-bank">{accountBank}</div>
                        <div className="account-num">
                            {accountNumber}
                        </div>
                    </div>
                    <button className="account-copy-btn" onClick={copyAccountNumber}>
                        <img src={copyBtn} alt="복사 버튼" />
                        복사
                    </button>
                </div>
            </div>
            <div className="divide-line"></div>
            <div className="info-bottom-container">
                <div className="info-bottom-menu">
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

export default InfoMenu;
