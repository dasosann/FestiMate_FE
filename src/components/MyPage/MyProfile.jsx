import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '/src/styles/MyPage/MyProfile.css';
import defaultProfile from '/assets/MyPage/default-profile.svg';
import contact from '/assets/MyPage/contact.svg';
import edit from '/assets/MyPage/edit.svg';
import message from '/assets/MyPage/message.svg';
import card from '/assets/MyPage/card_festival_type.svg';
import insta from '/assets/MyPage/insta.svg';

const MyProfile = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const name = "가대 고윤정";
    const attribute = ["02년생", "ESTP", "강아지상"];

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
            // history 상태 초기화 (다시 수정 완료 메시지가 뜨지 않도록)
            window.history.replaceState({}, '');
        }
    }, [location.state]);

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
                        <img src={contact} alt="연락정보" />
                        연락정보
                        <img src={edit} alt="수정" onClick={() => navigate('/mypage/editContact', { state: { from: 'MyProfile' } })} />
                    </div>
                    <div className="profile-text-box">
                        인스타 아이디는 ki_d6c8이야 <br/>
                        DM ME
                    </div>
                </div>
                <div className="profile-text-container">
                    <div className="meta-box">
                        <img src={message} alt="메시지" />
                        상대에게 전할 메시지
                        <img src={edit} alt="수정" onClick={() => navigate('/mypage/editMessage', { state: { from: 'MyProfile' } })} />
                    </div>
                    <div className="profile-text-box">
                        코로나 학번이라 축제는 처음인데.. 나랑 놀 사람 구해!
                    </div>
                </div>
            </div>

            <div className="divide-line"></div>

            <div className="profile-card-container">
                <img src={card} className="profile-card" alt="카드" />
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
