import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Festival/FestivalInfo.css';
import defaultProfile from '/assets/MyPage/default-profile.svg';
import date from '/assets/Festival/date.svg';
import point_ from '/assets/Festival/point.svg';
import noMatch from '/assets/Festival/no-match.svg';
import profileArrow from '/assets/Festival/profile-arrow.svg';
import male from '/assets/Festival/male.svg';
import female from '/assets/Festival/female.svg';
import CustomModal from './CustomModal';
import instance from '../../../axiosConfig';
import Navbar from './Navbar';

import newProfile from '/assets/Profile/new-type-profile.svg';
import healProfile from '/assets/Profile/healing-type-profile.svg';
import inssaProfile from '/assets/Profile/inssa-type-profile.svg';
import planProfile from '/assets/Profile/plan-type-profile.svg';
import shotProfile from '/assets/Profile/shot-type-profile.svg';

const ActiveFestival = ({festivalName, festivalDate, festivalId}) => {
    const navigate = useNavigate();
    const [point, setPoint] = useState(0);
    const [type, setType] = useState('');
    const [isAble, setIsAble] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleMatching = async () => {
        if (point > 0) {
            setIsAble(true);
            setIsModalOpen(true);
        } else {
            setIsAble(false);
            setIsModalOpen(true);
        }
    }

    const handleConfirmModal = () => {
        // 매칭 추가 로직 수행 및 포인트 차감
        if(isAble) {
            setPoint((prev) => prev - 1);
            alert('매칭이 추가되었습니다.');
            navigate('/mateLoading', { state : { name: "name" }});
        }
        setIsModalOpen(false);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

    // 티켓 카드 컴포넌트 (노치, 점선 등 포함)
    const TicketCard = ({ imageSrc, tags, name, gender }) => (
        <div className="ticket-card">
            {/* 전체 solid 테두리를 위한 요소 */}
            <div className="ticket-border"></div>
            <div className="ticket-top">
                <img src={newProfile} alt="캐릭터" className="ticket-image" />
                <div className="ticket-tags">
                    {tags.map((tag, i) => (
                        <span key={i} className="ticket-tag">#{tag}</span>
                    ))}
                </div>
            </div>
            <div className="ticket-bottom">
                <div className="ticket-info">
                    <div className="ticket-name">
                        {name} <img src={gender === 'male' ? male : female} />
                    </div>
                    <img src={profileArrow} alt="화살표" className="ticket-arrow" />
                </div>
            </div>
            {/* 노치를 가로지르는 점선 */}
            <div className="ticket-dashed-line"></div>
            {/* 좌우 노치 */}
            <div className="ticket-notch left"></div>
            <div className="ticket-notch right"></div>
        </div>
    );

    // 인디케이터 컴포넌트 (dots) - 도트 크기를 동적으로 계산하고, 트랜지션 적용
    const DotsIndicator = ({ currentIndex, totalCount }) => {
        const maxDots = 7;
        const dots = [];

        if (totalCount <= maxDots) {
            for (let i = 0; i < totalCount; i++) {
                dots.push(i);
            }
        } else {
            if (currentIndex < 3) {
                for (let i = 0; i < 4; i++) {
                    dots.push(i);
                }
                dots.push('right-ellipsis');
                dots.push(totalCount - 1);
            } else if (currentIndex > totalCount - 4) {
                dots.push(0);
                dots.push('left-ellipsis');
                for (let i = totalCount - 4; i < totalCount; i++) {
                    dots.push(i);
                }
            } else {
                dots.push(0);
                dots.push('left-ellipsis');
                dots.push(currentIndex - 1);
                dots.push(currentIndex);
                dots.push(currentIndex + 1);
                dots.push('right-ellipsis');
                dots.push(totalCount - 1);
            }
        }

        // 도트 크기를 현재 인덱스와의 차이에 따라 결정 (차이가 클수록 작게)
        const getDotSize = (dotIndex) => {
            const maxSize = 10; // active일 때 최대 크기
            const midSize = 8;
            const nearSize = 6;
            const minSize = 4;
            const diff = Math.abs(currentIndex - dotIndex);
            if (diff === 0) return maxSize;
            else if (diff === 1) return midSize;
            else if (diff === 2) return nearSize;
            else return minSize;
        };

        return (
            <div className="pagination-dots">
                {dots.map((item, idx) =>
                    item === 'left-ellipsis' || item === 'right-ellipsis' ? (
                        <div
                            key={idx}
                            className="dot ellipsis"
                            style={{
                                width: '4px',
                                height: '4px',
                                transition: 'all 0.3s ease'
                            }}
                        ></div>
                    ) : (
                        <div
                            key={idx}
                            className={`dot ${currentIndex === item ? 'active' : ''}`}
                            style={{
                                width: `${getDotSize(item)}px`,
                                height: `${getDotSize(item)}px`,
                                transition: 'all 0.3s ease'
                            }}
                        ></div>
                    )
                )}
            </div>
        );
    };

    // 슬라이드 컨테이너: ticket-card의 margin: 0 7%과 flex: 0 0 auto는 그대로 유지
    // 컨테이너 중앙과 각 카드 중앙의 거리를 비교하여 가장 가까운 카드를 현재 인덱스로 선택
    const FestivalMatching = ({ cards }) => {
        const containerRef = useRef(null);
        const [currentIndex, setCurrentIndex] = useState(0);

        const handleScroll = () => {
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const containerCenter = containerRect.left + containerRect.width / 2;
                const children = containerRef.current.children;
                let closestIndex = 0;
                let minDistance = Infinity;
                for (let i = 0; i < children.length; i++) {
                    const childRect = children[i].getBoundingClientRect();
                    const childCenter = childRect.left + childRect.width / 2;
                    const distance = Math.abs(childCenter - containerCenter);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = i;
                    }
                }
                setCurrentIndex(closestIndex);
            }
        };

        return (
            <div>
                <div
                    className="festival-matching-container"
                    ref={containerRef}
                    onScroll={handleScroll}
                >
                    {cards.map((card, i) => (
                        <TicketCard key={i} {...card} />
                    ))}
                </div>
                <DotsIndicator currentIndex={currentIndex} totalCount={cards.length} />
            </div>
        );
    };

    // 예시 카드 데이터
    const cards = [
        { imageSrc: newProfile, tags: ['01년생', 'INFP', '강아지상'], name: '연하공대훈', gender: 'male' },
        { imageSrc: newProfile, tags: ['02년생', 'ENTP', '고양이상'], name: '홍길동', gender: 'male' },
        { imageSrc: newProfile, tags: ['03년생', 'INFJ', '강아지상'], name: '이영희', gender: 'female' },
        { imageSrc: newProfile, tags: ['04년생', 'ISTJ', '강아지상'], name: '김철수', gender: 'male' },
        { imageSrc: newProfile, tags: ['04년생', 'ISTJ', '강아지상'], name: '김철수', gender: 'male' },
        { imageSrc: newProfile, tags: ['04년생', 'ISTJ', '강아지상'], name: '김철수', gender: 'male' },
        { imageSrc: newProfile, tags: ['04년생', 'ISTJ', '강아지상'], name: '김철수', gender: 'male' },
        { imageSrc: newProfile, tags: ['04년생', 'ISTJ', '강아지상'], name: '김철수', gender: 'male' },
        { imageSrc: newProfile, tags: ['04년생', 'ISTJ', '강아지상'], name: '김철수', gender: 'male' },
        { imageSrc: newProfile, tags: ['04년생', 'ISTJ', '강아지상'], name: '김철수', gender: 'male' },
        { imageSrc: newProfile, tags: ['04년생', 'ISTJ', '강아지상'], name: '김철수', gender: 'male' },
        { imageSrc: newProfile, tags: ['04년생', 'ISTJ', '강아지상'], name: '김철수', gender: 'male' },
        { imageSrc: newProfile, tags: ['04년생', 'ISTJ', '강아지상'], name: '김철수', gender: 'male' },
        { imageSrc: newProfile, tags: ['04년생', 'ISTJ', '강아지상'], name: '김철수', gender: 'male' },
        { imageSrc: newProfile, tags: ['04년생', 'ISTJ', '강아지상'], name: '김철수', gender: 'male' },
        // 추가 카드 데이터...
    ];

    return (
        <>
            <div className="festival-section-container">
                <div className="festival-top-container">
                    <div className="festival-profile-box">
                        <div className="festival-text-box">
                            <div className="festival-name-box">
                                <span className="point-color">{festivalName}</span>
                                <br />
                                참여중이에요!
                            </div>
                            <div className="festival-time-box">
                                <img src={date} alt="날짜" />
                                {festivalDate}
                            </div>
                        </div>
                        <img src={ProfileMap[type]} className="festival-profile-img" alt="프로필" />
                    </div>
                    <div className="festival-point-total-box" onClick={() => navigate('/mypage')}>
                        <img src={point_} alt="포인트" />
                        나의 잔여 포인트
                        <span className="festival-point-total">{`${point}P >`}</span>
                    </div>
                </div>
                <div className="divide-line"></div>
                <div className="festival-bottom-container">
                    <div className="festival-matching-box">
                        <div>나의 매칭 현황!</div>
                        <div className="matching-count">0/0</div>
                    </div>
                    <div className="festival-matching-container-wrapper">
                        {cards.length > 0 ? (
                            <FestivalMatching cards={cards} />
                        ) : (
                            <>
                                <div className="festival-matching-content">
                                    <img src={noMatch} alt="No Match" />
                                    아직 추가한 매칭이 없어요
                                </div>
                            </>
                        )}               
                    </div>
                    <button className="matching-plus-button" onClick={() => handleMatching()}>
                        + 매칭 추가하기
                    </button>
                </div>
            </div>
            <CustomModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmModal}
                onCancel={handleCancelModal}
                isAble={isAble}
            />
        </>
    );
};

export default ActiveFestival;
