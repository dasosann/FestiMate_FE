import React, { useState } from 'react';
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import '/src/styles/MyPage/EditContact.css';
import check from '/assets/InfoPage/check-coral.svg';

const EditContact = () => {
    const [contactInfo, setContactInfo] = useState('');
    const navigate = useNavigate();

    const handleContactChange = (e) => {
        setContactInfo(e.target.value);
    };
    
    const handleNext = () => {
        navigate('/mypage/myprofile', { state: { edited: true, what: 'contact' } })
    }

    return (
        <div className="edit-section-container">
            <div className="edit-top-container">
                <div className="edit-top-title">
                    상대방에게 전달할 <br />
                    <span className="point-color">연락 정보</span>를 작성해주세요
                </div>
                <div className="edit-top-sub-title">
                    <img src={check} className="edit-check" alt="확인" />
                    인스타그램, 카카오톡 아이디, 전화번호 등<br />
                    Festimate가 당신을 찾는 데 필요한 정보를 적어주세요.
                </div>
            </div>

            <div className="edit-bottom-container">
                <textarea 
                    className="edit-contact-box"
                    value={contactInfo}
                    onChange={handleContactChange}
                    placeholder="연락 정보를 입력하세요 (최대 50글자)"
                    maxLength="50"
                />
                <div className="edit-contact-count">
                    {contactInfo.length}/50
                </div>
            </div>

            <div className="edit-contact-warning">
                <div className="edit-warning-big">
                    꼭 읽어주세요!
                </div>
                <div className="edit-warning-small">
                    <span>정보가 잘못되거나 확실하지 않을 경우,</span><br />
                    <span>당신의 페스티메이트가 연락하지 못할 수 있어요!</span><br />
                    <span>해당 연락 정보가 맞는지 한 번 더 확인해보세요!</span>
                </div>
            </div>
            <button
                className={`edit-next-button ${contactInfo.length ? 'active' : 'inactive'}`}
                onClick={handleNext}
            >
                완료
            </button>
        </div>
    );
};

export default EditContact;
