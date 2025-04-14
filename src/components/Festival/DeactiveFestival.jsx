import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Festival/FestivalInfo.css';
import defaultProfile from '/assets/MyPage/default-profile.svg';
import date from '/assets/Festival/date.svg';
import point_ from '/assets/Festival/point.svg';
import noMatch from '/assets/Festival/no-match.svg';
import endFestival from '/assets/Festival/end-festival.svg';

const DeactiveFestival = () => {
    const navigate = useNavigate();
    const festivalName = "가톨릭대학교 다맛제";
    const total = "1";

    return (
        <>
            <div className="festival-section-container">
                <div className="festival-top-container">
                    <div className="festival-profile-box">
                        <div className="festival-text-box">
                            <div className="festival-name-box">
                                <span className="point-color">{festivalName}</span>
                                <br />
                                종료된 페스티벌이에요!
                            </div>
                            <div className="festival-time-box">
                                <img src={date} alt="날짜" />
                                2025.05.18 - 2025.05.21
                            </div>
                        </div>
                        <img src={defaultProfile} className="festival-profile-img" alt="프로필" />
                    </div>
                    <div className="festival-point-total-box" onClick={() => navigate('/mypage')}>
                        <img src={point_} alt="포인트" />
                        나의 잔여 포인트
                        <span className="festival-point-total">{`${total}P >`}</span>
                    </div>
                </div>
                <div className="end-notice">
                    종료된 페스티벌로 더 이상의 서비스 이용이 불가합니다.<br/>
                    더 자세한 환불 문의는 festimate2025@gmail.com
                </div>
                <div className="festival-bottom-container">
                    <div className="festival-matching-container-wrapper">
                        <div className="festival-matching-content">
                            <img src={endFestival} alt="No Match" />
                        </div>            
                    </div>
                </div>
                <button
                        className='refund-button'
                        onClick={() => navigate('/mypage')}
                >
                    포인트 환불 신청하기
                </button>
            </div>
        </>
    );
};

export default DeactiveFestival;
