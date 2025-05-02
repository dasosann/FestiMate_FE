import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '/src/styles/MyPage/MyProfile.css';
import defaultProfile from '/assets/MyPage/default-profile.svg';
import contactImg from '/assets/MyPage/contact.svg';
import edit from '/assets/MyPage/edit.svg';
import messageImg from '/assets/MyPage/message.svg';
import card from '/assets/MyPage/card_festival_type.svg';
import insta from '/assets/MyPage/insta.svg';
import instance from '../../../axiosConfig';
import male from '/assets/Festival/male.svg';
import female from '/assets/Festival/female.svg';

import newCard from '/assets/Card/new-card.svg';
import healCard from '/assets/Card/healing-card.svg';
import inssaCard from '/assets/Card/inssa-card.svg';
import planCard from '/assets/Card/plan-card.svg';
import shotCard from '/assets/Card/shot-card.svg';

const MyProfile = ({festivalId}) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [gender, setGender] = useState('male');
    const [name, setName] = useState('');
    const [attribute, setAttribute] = useState([]);
    const [contact, setContact] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const faceMap = {
        'DOG': "강아지상",
        'CAT': "고양이상",
        'BEAR': "곰상",
        'BUNNY': "토끼상",
        'FOX': "여우상",
        'DINOSAUR': "공룡상"
    };
    const CardMap = {
        'NEWBIE': newCard,
        'HEALING': healCard,
        'INFLUENCER': inssaCard,
        'PLANNER': planCard,
        'PHOTO': shotCard
    };

    // 수정 페이지에서 돌아왔을 때 state에 edited가 있다면 토스트 메시지 표시
    useEffect(() => {
        if (location.state?.edited) {
            if(location.state.what == 'message')
                setToastMessage("메시지가 정상적으로 수정되었습니다.");
            else
                setToastMessage("연락 정보가 정상적으로 수정되었습니다.");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
            window.history.replaceState({}, '');
        }
        else if(location.state?.edited === false){
            if(location.state.what == 'message')
                setToastMessage("메시지 수정에 실패했습니다.");
            else
                setToastMessage("연락 정보 수정에 실패했습니다.");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
            window.history.replaceState({}, '');
        }
    }, [location.state]);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const result = await instance.get(`/v1/festivals/${festivalId}/me/type`);
                const tmp = result.data.data;
                setGender(tmp.gender);
                setName(tmp.nickname);
                setAttribute([tmp.birthYear.toString().slice(2, 4)+"년생", tmp.mbti, faceMap[tmp.appearanceType]])
                setContact(tmp.introduction);
                setMessage(tmp.message);
                setType(tmp.typeResult);
                console.log(result);
            } catch (error) {
                console.error("[Nickname API Error] GET /v1/users/me/nickname:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
            }
        }
        getInfo();
    }, [location.state]);

    return (
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
                        <img src={edit} alt="수정" onClick={() => navigate('../editContact', { state: { from: 'MyProfile', contactData: contact, messageData: message } })} />
                    </div>
                    <div className="profile-text-box">
                        {contact}
                    </div>
                </div>
                <div className="profile-text-container">
                    <div className="meta-box">
                        <img src={messageImg} alt="메시지" />
                        상대에게 전할 메시지
                        <img src={edit} alt="수정" onClick={() => navigate('../editMessage', { state: { from: 'MyProfile', messageData: message, contactData: contact } })} />
                    </div>
                    <div className="profile-text-box">
                        {message}
                    </div>
                </div>
            </div>

            <div className="divide-line"></div>

            <div className="profile-card-container">
                <img src={CardMap[type]} className="profile-card" alt="카드" />
            </div>
            <div className="insta-share">
                <button className="insta-btn">
                    <img src={insta} alt="인스타" />
                    인스타로 공유하기
                </button>
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

export default MyProfile;
``
