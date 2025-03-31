import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '/src/styles/Festival/FestivalInfo.css';
import defaultProfile from '/assets/MyPage/default-profile.svg';
import arrow from '/assets/MyPage/arrow.svg';
import date from '/assets/Festival/date.svg';
import point_ from '/assets/Festival/point.svg';
import noMatch from '/assets/Festival/no-match.svg';
import cardProfile from '/assets/Festival/profile-tmp.svg';
import profileArrow from '/assets/Festival/profile-arrow.svg';
import Navbar from './Navbar';

const FestivalInfo = () => {
    const navigate = useNavigate();

    const festivalName="가톨릭대학교 다맛제";
    const total = "1";
    const matching = 0;

    function TicketCard({ 
            imageSrc,      // 티켓에 들어갈 캐릭터/사진 경로
            tags,          // 해시태그 목록 (배열)
            name,          // 예: "연하공대훈"
            gender,        // 'male' | 'female' 등
        }) {
        return (
            <div className="ticket-card">
                {/* 전체 solid 테두리를 위한 요소 */}
                <div className="ticket-border"></div>
                
                <div className="ticket-top">
                    <img src={cardProfile} alt="캐릭터" className="ticket-image" />

                    {/* 태그 목록 */}
                    <div className="ticket-tags">
                        {tags.map((tag, i) => (
                        <span key={i} className="ticket-tag">#{tag}</span>
                        ))}
                    </div>
                </div>
                {/* 이름 + 성별 아이콘 */}
                <div className="ticket-bottom">
                    <div className="ticket-info">
                        <div className="ticket-name">
                        {name}
                        {gender === 'male' ? ' ♂' : ' ♀'}
                        </div>
                        <img src={profileArrow} alt="화살표" className="ticket-arrow" />
                    </div>
                </div>
                {/* 노치를 가로지르는 점선( perforation line ) */}
                <div className="ticket-dashed-line"></div>

                {/* 노치 요소 */}
                <div className="ticket-notch left"></div>
                <div className="ticket-notch right"></div>
                </div>
        );
      }

    return (
        <>
        <Navbar />
        <div className="festival-section-container">
            <div className="festival-top-container">
            <div className="festival-profile-box">
                <div className="festival-text-box">
                    <div className="festival-name-box">
                        <span className="point-color">{festivalName}</span><br />
                        참여중이에요!
                    </div>
                    <div className="festival-time-box">
                        <img src={date} alt="날짜" />
                        2025.05.18 - 2025.05.20
                    </div>
                </div>
                <img src={defaultProfile} className="festival-profile-img" alt="프로필" />
            </div>
                <div className="festival-point-total-box">
                    <img src={point_} />
                    나의 잔여 포인트
                    <span className="festival-point-total">{`${total}P`} </span>
                </div>
            </div>
            <div className="divide-line"></div>

            <div className="festival-bottom-container">
                <div className="festival-matching-box">
                    <div>
                    나의 매칭 현황!
                    </div>

                    <div className="matching-count">
                    0/0
                    </div>
                </div>
                <div className="festival-matching-container">
                    { matching ?
                        <>
                        <div className="festival-matching-content">
                            <img src={noMatch} />
                            아직 추가한 매칭이 없어요
                        </div>
                        <button className="matching-plus-button">
                            + 매칭 추가하기
                        </button>
                        </>
                    :
                    <>
                        <TicketCard
                        imageSrc="/assets/character.png"
                        tags={['01년생', 'INFP', '강아지상']}
                        name="연하공대훈"
                        gender="male"
                        />
                        <TicketCard
                        imageSrc="/assets/character.png"
                        tags={['01년생', 'INFP', '강아지상']}
                        name="연하공대훈"
                        gender="male"
                        />
                        <TicketCard
                        imageSrc="/assets/character.png"
                        tags={['01년생', 'INFP', '강아지상']}
                        name="연하공대훈"
                        gender="male"
                        />
                    </>
                        
                    }
                </div>
            </div>
        </div>
    </>
    );
};

export default FestivalInfo;
