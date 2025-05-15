import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import '/src/styles/MyPage/InfoMenu.css';
import defaultProfile from '/assets/MyPage/default-profile.svg';
import copyBtn from '/assets/MyPage/copyBtn.svg';
import arrow from '/assets/MyPage/arrow.svg';
import warning from '/assets/MyPage/account-warning.svg';
import clock from '/assets/MyPage/clock.svg';
import instance from '../../../axiosConfig';

import newProfile from '/assets/Profile/new-type-profile.svg';
import healProfile from '/assets/Profile/healing-type-profile.svg';
import inssaProfile from '/assets/Profile/inssa-type-profile.svg';
import planProfile from '/assets/Profile/plan-type-profile.svg';
import shotProfile from '/assets/Profile/shot-type-profile.svg';

const InfoMenu = ({festivalId}) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showWarningTooltip, setShowWarningTooltip] = useState(false);
    const [type, setType] = useState('');
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState('');

    const ProfileMap = {
            'NEWBIE': newProfile, 
            'HEALING': healProfile,
            'INFLUENCER': inssaProfile,
            'PLANNER': planProfile,
            'PHOTO': shotProfile
        };

    useEffect(() => {
        const getNickname = async () => {
            try {
                const result = await instance.get(`/v1/festivals/${festivalId}/participants/me/profile`);
                setName(result.data.data.nickname);
                setType(result.data.data.typeResult);
                console.log(result);
            } catch (error) {
                console.error("[Nickname API Error] GET /v1/users/participants/me/nickname:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
            }
        }
        const getFestival = async () => {
            try {
                const result = await instance.get(`/v1/festivals/${festivalId}`);
                //setDate(result.data.data.festivalDate);
                
                const festivalDateRange = result.data.data.festivalDate;
                if (festivalDateRange && festivalDateRange.includes('~')) {
                    const endDateStr = festivalDateRange.split('~')[1].trim();
                    const endDateParts = endDateStr.split('.');
                    const endDate = new Date(
                        parseInt(endDateParts[0]),
                        parseInt(endDateParts[1]) - 1, // 월은 0부터 시작하므로 -1
                        parseInt(endDateParts[2])
                    );
                    
                    const currentDate = new Date();
                    
                    // 종료일이 현재 날짜보다 이전이면 축제가 종료된 것
                    if (endDate < currentDate) {
                        setIsActive(false);

                    } else {            
                        setIsActive(true);
                    }
                }
                
                console.log(result);
            } catch (error) {
                console.error("[festival API Error] GET /v1/festivals/${festivalId}:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
                setIsActive(false);
            }
        }
        getNickname();
        getFestival();
    }, [festivalId]);

    const copyAccountNumber = () => {
        const textToCopy = "카카오뱅크 3333-18-89015";
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

    const toggleWarningTooltip = () => {
        setShowWarningTooltip(!showWarningTooltip);
        
        if (!showWarningTooltip) {
            // 일정 시간 후 툴팁 자동으로 닫기
            setTimeout(() => {
                setShowWarningTooltip(false);
            }, 3000);
        }
    };

    return (
        <div className="info-section-container">
            <div className="info-top-container">
                <div className="info-profile-box">
                    <img src={ProfileMap[type]} className="info-profile-img" alt="프로필" />
                    <div className="info-name-box">
                        안녕하세요! <br /> <span className="point-color">{name}</span>님
                    </div>
                    { isActive &&
                    <button className="info-modify-btn" onClick={() => navigate('./myprofile')}>
                        내 프로필
                    </button>
                    }
                </div>
                {isActive ?
                    <div className="info-account-box">
                        <div className="account-num-box">
                            { /*<div className="account-bank">{accountBank}</div>*/ }
                            <div className="account-warning">
                                입금 시 주의 사항
                                <img 
                                    src={warning} 
                                    alt="주의사항" 
                                    onClick={toggleWarningTooltip}
                                    className="warning-icon"
                                />
                                {showWarningTooltip && (
                                    <div className="warning-tooltip">
                                        입금 후 부스 방문 혹은 카카오톡으로 연락을 주셔야<br/>
                                        포인트 충전이 가능합니다!
                                    </div>
                                )}
                            </div>
                            <div className="account-num">
                                카카오뱅크 3333-18-89015
                                <img src={copyBtn} onClick={copyAccountNumber} alt="복사 버튼" />
                            </div>
                            <div className="account-time">
                                <img src={clock} />
                                입금확인
                                <span>·</span>
                                오전 09:00 ~ 20:00
                            </div>
                        </div>
                        <button className="account-confirm-btn" onClick={() => window.open('https://open.kakao.com/o/g9JOe6vh')}>
                            입금 후 연락하러 가기
                        </button>
                    </div>
                    : null
                }
            </div>
            <div className="divide-line"></div>
            <div className="info-bottom-container">
                <div className="info-bottom-menu" onClick={() => navigate(`./point`)}>
                    내 포인트 내역
                    <img src={arrow} className="info-arrow" alt="화살표" />
                </div>
                <div className="info-bottom-menu" onClick={() => window.open("https://psychedelic-perigee-94e.notion.site/1cbaebccb8e4813fb860f9ea31d0ee69?pvs=4")}>
                    포인트 제도 소개
                    <img src={arrow} className="info-arrow" alt="화살표" />
                </div>
                <div className="info-bottom-menu" onClick={() => window.open("https://psychedelic-perigee-94e.notion.site/1cbaebccb8e4813dae70e4535a18228c?pvs=4")}>
                    문의하기
                    <img src={arrow} className="info-arrow" alt="화살표" />
                </div>
                <div className="info-bottom-menu" onClick={() => window.open("https://psychedelic-perigee-94e.notion.site/1cbaebccb8e481bcb46febaa6e5f80a5?pvs=4")}>
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