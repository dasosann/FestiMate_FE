import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '/src/styles/Festival/UserInfo.css';
import arrow from '/assets/MyPage/arrow.svg';
import contact from '/assets/MyPage/contact.svg';
import message from '/assets/MyPage/message.svg';
import card from '/assets/MyPage/card_festival_type.svg';
import male from '/assets/Festival/male.svg';
import female from '/assets/Festival/female.svg';
import Navbar from './Navbar';


const UserInfo = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();
    const [gender, setGender] = useState('male');

    const name="가대 고윤정";
    const attribute = ["02년생", "ESTP", "강아지상"];

    return (
        <>
        <Navbar />
        <div className="festUser-section-container">
            <div className="festUser-top-container">
                <div className="festUser-festUser-box">
                    <div className="festUser-name-box">
                        {name}
                    </div>
                    <img src={gender === 'male' ? male : female} />
                </div>
                <div className="festUser-about-box">
                    {attribute.map((data, index) => (
                        <div className="about-me" key={index}>
                            {`#${data}`}
                        </div>
                    ))}
                </div>
            </div>

            <div className="divide-line"></div>
            
            <div className="festUser-message-box">
                <div className="festUser-text-container">
                    <div className="meta-box">
                        <img src={contact} alt="연락정보" />
                        연락정보
                    </div>
                    <div className="festUser-text-box">
                        인스타 아이디는 ki_d6c8이야 <br/>
                        DM ME
                    </div>
                </div>
                <div className="festUser-text-container">
                    <div className="meta-box">
                        <img src={message} alt="메시지" />
                        상대에게 전할 메시지
                    </div>
                    <div className="festUser-text-box">
                        코로나 학번이라 축제는 처음인데.. 나랑 놀 사람 구해!
                    </div>
                </div>
            </div>

            <div className="divide-line"></div>

            <div className="festUser-card-container">
                <img src={card} className="festUser-card" alt="카드" />
            </div>
        </div>
        </>
    );
};

export default UserInfo;
