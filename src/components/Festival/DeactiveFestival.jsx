import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Festival/FestivalInfo.css';
import defaultProfile from '/assets/MyPage/default-profile.svg';
import date from '/assets/Festival/date.svg';
import point_ from '/assets/Festival/point.svg';
import noMatch from '/assets/Festival/no-match.svg';
import endFestival from '/assets/Festival/end-festival.svg';
import rightArrow from '/assets/Festival/arrow-right.svg';
import info from '/assets/Festival/info-btn.svg';
import instance from '../../../axiosConfig';

import newProfile from '/assets/Profile/new-type-profile.svg';
import healProfile from '/assets/Profile/healing-type-profile.svg';
import inssaProfile from '/assets/Profile/inssa-type-profile.svg';
import planProfile from '/assets/Profile/plan-type-profile.svg';
import shotProfile from '/assets/Profile/shot-type-profile.svg';


const DeactiveFestival = ({festivalName, festivalDate, festivalId}) => {
    const navigate = useNavigate();

    const [point, setPoint] = useState('');
    const [type, setType] = useState('');

    const ProfileMap = {
        'NEWBIE': newProfile,
        'HEALING': healProfile,
        'INFLUENCER': inssaProfile,
        'PLANNER': planProfile,
        'PHOTO': shotProfile
    };

    useEffect(() => {
        const getInfo = async () => {
            try {
                const result = await instance.get(`/v1/festivals/${festivalId}/me/summary`);
                setPoint(result.data.data.point)
                setType(result.data.data.typeResult);
                console.log(result);
            } catch (error) {
                console.error("[getInfo API Error] GET /v1/festivals/${festivalId}/me/summary:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
            }
        }
        getInfo();
    }, [festivalId]);

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
                                {festivalDate}
                            </div>
                        </div>
                        <img src={ProfileMap[type]} className="festival-profile-img" alt="프로필" />
                    </div>
                    <div className="festival-point-total-box" onClick={() => navigate(`/festival/${festivalId}/mypage`)}>
                        <img src={point_} alt="포인트" />
                        나의 잔여 포인트
                        <span className="festival-point-total">{`${point}P`}
                            <img className="right-arrow" src={rightArrow} />
                        </span>
                    </div>
                </div>
                <div className="end-notice">
                    <div className="info-icon-container">
                        <img src={info} />
                    </div>
                    <span> 종료된 페스티벌로 더 이상의 서비스 이용이 불가합니다.<br/>
                    더 자세한 환불 문의: festimate2025@gmail.com</span>
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
                        onClick={() => window.open('https://www.notion.so/1bcaebccb8e480f4ad57fdf7adb53ead')}
                >
                    포인트 환불 신청하기
                </button>
            </div>
        </>
    );
};

export default DeactiveFestival;
