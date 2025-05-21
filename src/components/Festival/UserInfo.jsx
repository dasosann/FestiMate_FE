import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '/src/styles/MyPage/MyProfile.css';

import arrow from '/assets/MyPage/arrow.svg';
import contact from '/assets/MyPage/contact.svg';
import message from '/assets/MyPage/message.svg';
import card from '/assets/MyPage/card_festival_type.svg';
import male from '/assets/Festival/male.svg';
import female from '/assets/Festival/female.svg';
import contactImg from '/assets/MyPage/contact.svg';
import messageImg from '/assets/MyPage/message.svg';
import Navbar from './Navbar';

import newCard from '/assets/Card/new-card.svg';
import healCard from '/assets/Card/healing-card.svg';
import inssaCard from '/assets/Card/inssa-card.svg';
import planCard from '/assets/Card/plan-card.svg';
import shotCard from '/assets/Card/shot-card.svg';

import instance from '../../../axiosConfig';


const UserInfo = () => {
    const navigate = useNavigate();

    const [gender, setGender] = useState('male');
    const [name, setName] = useState('');
    const [attribute, setAttribute] = useState([]);
    const [contact, setContact] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const [match, setMatch] = useState([]);

    const festivalId = useParams().festivalId;
    const matchingId = useParams().matchingId;

    const CardMap = {
        'NEWBIE': newCard,
        'HEALING': healCard,
        'INFLUENCER': inssaCard,
        'PLANNER': planCard,
        'PHOTO': shotCard
    };
    const faceMap = {
        'DOG': "강아지상",
        'CAT': "고양이상",
        'BEAR': "곰상",
        'RABBIT': "토끼상",
        'FOX': "여우상",
        'DINOSAUR': "공룡상"
    };

    useEffect(() => {
        const getInfo = async () => {
            try {
                const result = await instance.get(`/v1/festivals/${festivalId}/matchings/${matchingId}`);
                const tmp = result.data.data;
                setGender(tmp.gender);
                setName(tmp.nickname);
                setAttribute([tmp.birthYear.toString().slice(2, 4)+"년생", tmp.mbti, faceMap[tmp.appearance]])
                setContact(tmp.introduction);
                setMessage(tmp.message);
                setType(tmp.typeResult);
                
            } catch (error) {
                console.error(`/v1/festivals/${festivalId}/matchings/${matchingId}`, {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
            }
        }

        const getMatching = async () => {
            try {
                const result = await instance.get(`/v1/festivals/${festivalId}/matchings`);
                const matchingList = result.data.data.matchingList;
                setMatch(matchingList);
                
                // 매칭 ID가 리스트에 있는지 확인
                const matchingExists = matchingList.some(matching => matching.matchingId === parseInt(matchingId));
                if (!matchingExists) {
                    navigate(-1); // 이전 페이지로 이동
                }else {
                    getInfo();
                }
            } catch (error) {
                console.error("[getMatching API Error] GET /v1/festivals/${festivalId}/matchings:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
            }
        };
        getMatching();
    }, [location.state, matchingId]);

    return (
        <>
        <Navbar/>
        <div className="profile-section-container">
            <div className="profile-top-container">
                <div className="profile-profile-box">
                    <div className="profile-name-box">
                        {name}
                    </div>
                    <img src={gender === 'MAN' ? male : female} />
                </div>
                <div className="profile-about-box">
                    {attribute.map((data, index) => (
                        <div className="about-me" key={index}>
                            {`#${data}`}
                        </div>
                    ))}
                </div>
            </div>

            <div className="divide-line"></div>
            
            <div className="profile-message-box">
                <div className="profile-text-container">
                    <div className="meta-box">
                        <img src={contactImg} alt="연락정보" />
                        연락 정보
                    </div>
                    <div className="profile-text-box">
                        {contact}
                    </div>
                </div>
                <div className="profile-text-container">
                    <div className="meta-box">
                        <img src={messageImg} alt="메시지" />
                        상대에게 전달할 메시지
                    </div>
                    <div className="profile-text-box">
                        {message || "연락을 통해 직접 대화해보세요!"}
                    </div>
                </div>
            </div>

            <div className="divide-line"></div>

            <div className="matching-profile-card-container">
                <img src={CardMap[type]} className="profile-card" alt="카드" />
            </div>
            <div className="profile-btn-container"></div>
        </div>
        </>
    );
};

export default UserInfo;
