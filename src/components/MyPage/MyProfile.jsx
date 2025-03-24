import React, { useState } from 'react';
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import '/src/styles/MyPage/MyProfile.css';
import defaultProfile from '/assets/MyPage/default-profile.svg';
import contact from '/assets/MyPage/contact.svg';
import edit from '/assets/MyPage/edit.svg';
import message from '/assets/MyPage/message.svg';
import card from '/assets/MyPage/card_festival_type.svg';
import insta from '/assets/MyPage/insta.svg';

const MyProfile = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const name="가대 고윤정";
    const accountBank = "국민은행";
    const accountNumber = "817202-04-045292";

    const attribute = ["02년생", "ESTP", "강아지상"];

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
        <div className="profile-section-container">
            <div className="profile-top-container">
                <div className="profile-profile-box">
                    <img src={defaultProfile} className="profile-profile-img" alt="프로필" />
                    <div className="profile-name-box">
                        {name}
                    </div>
                </div>
                <div className="profile-about-box">
                        {attribute.map((data) => (
                            <div className="about-me">
                                {`#${data}`}
                            </div>
                        ))}
                    </div>
            </div>

            <div className="divide-line"></div>
            
            <div className="profile-message-box">
                <div className="profile-text-container">
                    <div className="meta-box">
                        <img src={contact} />
                        연락정보
                        <img src={edit} />
                    </div>
                    <div className="profile-text-box">
                        인스타 아이디는 ki_d6c8이야 <br/>
                        DM ME
                    </div>
                </div>
                <div className="profile-text-container">
                <div className="meta-box">
                        <img src={message} />
                        상대에게 전할 메시지
                        <img src={edit} />
                    </div>
                    <div className="profile-text-box">
                        코로나 학번이라 축제는 처음인데.. 나랑 놀 사람 구해!
                    </div>
                </div>
            </div>

            <div className="divide-line"></div>

            <div className="profile-card-container">
                <img src={card} className="profile-card"/>
            </div>
            <div className="insta-share">
                <button className="insta-btn">
                    <img src={insta} />
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
