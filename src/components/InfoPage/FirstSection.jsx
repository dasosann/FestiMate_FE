import React, { useState } from 'react';
import '/src/styles/InfoPage/FirstSection.css';
import check from '/assets/InfoPage/check-coral.svg';


const FirstSection = ({setCurrentPage, name, setName, phone, setPhone}) => {
    const isBothFilled = name.trim() !== '' && phone.trim() !== '';

    const handleNext = () => {
        if (isBothFilled) {
            setCurrentPage(prevPage => prevPage + 1);
            console.log('다음 페이지로 이동');
        }
    };

    function formatPhoneNumber(value) {
        let digits = value.replace(/\D/g, '');
        
        digits = digits.substring(0, 11);
        digits = digits.replace(/^(\d{3})(?=\d)/, '$1-');
        digits = digits.replace(/^(...-....)(?=\d)/, '$1-');
        
        return digits;
    }

    const handleChange = (e) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhone(formatted);
    };

    return (
        <div className="info-container">
            <div className="info-phrase">
                매칭을 위한 <span className="point-color">필수 정보</span>를 입력해주세요!
            </div>
            <div className="info-explain">
                <img src={check} alt="check" />
                이름과 연락처는 이체 확인용으로만 사용됩니다.
            </div>
            <div className="info-explain">
                <img src={check} alt="check" />
                반드시 실명으로 입력해주세요.
            </div>

            <div className="content-container">
                <div className="info-input-container">
                    <div className="info-input-title">이름</div>
                    <div className="info-input-wrapper">
                        <input
                        type="text"
                        className="info-input"
                        placeholder="이름을 입력해주세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="info-input-container">
                    <div className="info-input-title">연락처</div>
                    <div className="info-input-wrapper">
                        <input
                        type="text"
                        className="info-input"
                        placeholder="ex) 010-1234-5678"
                        value={phone}
                        onChange={handleChange}
                        />
                    </div>
                </div>

                <button
                className={`next-button ${isBothFilled ? 'active' : 'inactive'}`}
                onClick={handleNext}
                >
                다음
                </button>
            </div>
        </div>
    );
};

export default FirstSection;
