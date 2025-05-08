import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Festival/FestivalInfo.css';
import defaultProfile from '/assets/MyPage/default-profile.svg';
import date from '/assets/Festival/date.svg';
import point_ from '/assets/Festival/point.svg';
import noMatch from '/assets/Festival/no-match.svg';
import blank from '/assets/Festival/blank.svg';
import profileArrow from '/assets/Festival/profile-arrow.svg';
import male from '/assets/Festival/male.svg';
import female from '/assets/Festival/female.svg';
import rightArrow from '/assets/Festival/arrow-right.svg';
import CustomModal from './CustomModal';
import instance from '../../../axiosConfig';
import Navbar from './Navbar';
import refresh from '/assets/Festival/refresh.svg';

import newProfile from '/assets/Profile/new-type-profile.svg';
import healProfile from '/assets/Profile/healing-type-profile.svg';
import inssaProfile from '/assets/Profile/inssa-type-profile.svg';
import planProfile from '/assets/Profile/plan-type-profile.svg';
import shotProfile from '/assets/Profile/shot-type-profile.svg';

import newCard from '/assets/Festival/new-matching.svg';
import healCard from '/assets/Festival/healing-matching.svg';
import inssaCard from '/assets/Festival/inssa-matching.svg';
import planCard from '/assets/Festival/plan-matching.svg';
import shotCard from '/assets/Festival/shot-matching.svg';

const ActiveFestival = ({festivalName, festivalDate, festivalId}) => {
    const navigate = useNavigate();
    const [point, setPoint] = useState(0);
    const [type, setType] = useState('');
    const [isAble, setIsAble] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [match, setMatch] = useState([]);
    const [isRotating, setIsRotating] = useState(false);

    const CardMap = {
        'NEWBIE': newCard,
        'HEALING': healCard,
        'INFLUENCER': inssaCard,
        'PLANNER': planCard,
        'PHOTO': shotCard
    };
    const ProfileMap = {
        'NEWBIE': newProfile,
        'HEALING': healProfile,
        'INFLUENCER': inssaProfile,
        'PLANNER': planProfile,
        'PHOTO': shotProfile
    };
    const faceMap = {
        'DOG': "강아지상",
        'CAT': "고양이상",
        'BEAR': "      상",
        'BUNNY': "토끼상",
        'FOX': "여우상",
        'DINOSAUR': "공룡상"
    };

    useEffect(() => {
        const getInfo = async () => {
            try {
                const result = await instance.get(`/v1/festivals/${festivalId}/participants/me/summary`);
                setPoint(result.data.data.point)
                setType(result.data.data.typeResult);
            } catch (error) {
                console.error("[getInfo API Error] GET /v1/festivals/${festivalId}/participants/me/summary:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
            }
        }
        getInfo();
    }, [festivalId]);

    // useEffect 바깥에 선언
    const getMatching = async () => {
        try {
            const result = await instance.get(`/v1/festivals/${festivalId}/matchings`);
            setMatch(result.data.data.matchingList);
            console.log(result);
        } catch (error) {
            console.error("[getMatching API Error] GET /v1/festivals/${festivalId}/matchings:", {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });
        }
    };

    useEffect(() => {
        getMatching();
    }, [festivalId]);

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

    const handleMatching = async () => {
        if (point > 0) {
            setIsAble(true);
            setIsModalOpen(true);
        } else {
            setIsAble(false);
            setIsModalOpen(true);
        }
    }

    const handleConfirmModal = async () => {
        // 매칭 추가 로직 수행 및 포인트 차감
        if(isAble) {
            setPoint((prev) => prev - 1);
            const result = await instance.post(`/v1/festivals/${festivalId}/matchings`);
            if (result.status !== 500) {
                alert('매칭이 추가되었습니다.');
                navigate('/mateLoading', { state : { name: "name" }});
            }
        } else {
            navigate(`/festival/${festivalId}/mypage`);
        }
        setIsModalOpen(false);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

    // 티켓 카드 컴포넌트 (노치, 점선 등 포함)
    const TicketCard = ({ matchingId, matchingStatus, nickname, gender, birthYear, mbti, appearance, typeResult }) => (
        <div className="ticket-card">
            {/* 전체 solid 테두리를 위한 요소 */}
            <div className="ticket-border"></div>
            <div className="ticket-top">
                <img src={matchingStatus === 'PENDING' ? noMatch : CardMap[typeResult]} alt="캐릭터" className={matchingStatus === 'PENDING' ? "ticket-image" : "matching-ticket-image"} />
                {matchingStatus !== 'PENDING' && (
                <div className="ticket-tags">
                        <span className="ticket-tag">#{birthYear.toString().slice(2, 4)+"년생"}</span>
                        <span className="ticket-tag">#{mbti}</span>
                        <span className="ticket-tag">#{faceMap[appearance]}</span>
                    </div>
                )}
            </div>
            <div className="ticket-bottom">
                <div className="ticket-info">
                    {matchingStatus === 'PENDING' ? (
                        <div className="ticket-pending">
                            이상형 조건에 맞는 <br/>
                            festimate를 찾는 중이에요!
                        </div>
                    ) : (
                        <>
                        <div className="ticket-name">
                            {nickname} <img src={gender === 'WOMAN' ? female : male} alt="성별" />
                        </div>
                        <img src={profileArrow} alt="화살표" className="ticket-arrow" onClick={() => navigate(`/festival/${festivalId}/${matchingId}`)}/>
                        </>
                    )}
                </div>
            </div>

            {matchingStatus !== 'PENDING' && (
                <div className="ticket-dashed-line"></div>
            )}
            
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

    const handleRefreshClick = () => {
        setIsRotating(true);
        getMatching();
        setTimeout(() => setIsRotating(false), 700);
    };

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
                    <div className="festival-point-total-box" onClick={() => navigate(`/festival/${festivalId}/mypage`)}>
                        <img src={point_} alt="포인트" />
                        나의 잔여 포인트
                        <span className="festival-point-total">{`${point}P`}
                            <img className="right-arrow" src={rightArrow} />
                        </span>
                    </div>
                </div>
                <div className="divide-line"></div>
                <div className="festival-bottom-container">
                    <div className="festival-matching-box">
                        <div>나의 매칭 현황!</div>
                        <div className="matching-count">
                            {match.length === 0 ? (
                                <>{match.filter(m => m.matchingStatus === 'COMPLETED').length}/{match.length}</>
                            ) : (
                                <>
                                    <span className="matching-count-coral">{match.filter(m => m.matchingStatus === 'COMPLETED').length}</span>
                                    <span className="matching-count-black">/{match.length}</span>
                                </>
                            )}
                        </div>
                        <img src={refresh} alt="새로고침" className={`festival-refresh-icon${isRotating ? ' rotate' : ''}`} onClick={handleRefreshClick}/>
                    </div>
                    <div className="festival-matching-container-wrapper">
                        {match.length > 0 ? (
                            <FestivalMatching cards={match} />
                        ) : (
                            <>
                                <div className="festival-matching-content">
                                    <img src={blank} alt="No Match" />
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
