import React, { useState } from 'react';
import '/src/styles/InfoPage/FirstSection.css';
import check from '/assets/InfoPage/check-coral.svg';


const FirstSection = ({setCurrentPage, name, setName, phone, setPhone}) => {
    const [nameError, setNameError] = useState('');
    const [nameLen, setNameLen] = useState(0);
    const [isValidName, setIsValidName] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);
    
    // 이름과 전화번호가 모두 유효하고 채워졌는지 확인
    const isBothFilled = isValidName && isValidPhone;

    const handleNext = () => {
        if (isBothFilled) {
            setCurrentPage(prevPage => prevPage + 1);
            console.log('다음 페이지로 이동');
        }
    };

    // 이름 유효성 검사 함수
    const validateName = (value) => {
        const regex = /^[가-힣a-zA-Z]+$/; // 한글과 영어만 허용
        
        if (value.length < 2) {
            setNameError('최소 2글자 이상 입력해주세요.');
            setIsValidName(false);
            return;
        }
        
        if (value.length > 5) {
            setNameError('최대 5글자까지 입력 가능합니다.');
            setIsValidName(false);
            return;
        }
        
        if (!regex.test(value)) {
            setNameError('한글과 영어만 입력 가능합니다.');
            setIsValidName(false);
            return;
        }
        
        // 띄어쓰기 체크
        if (/\s/.test(value)) {
            setNameError('띄어쓰기는 입력할 수 없습니다.');
            setIsValidName(false);
            return;
        }
        
        // 모든 조건 통과
        setNameError('');
        setIsValidName(true);
    };

    const handleNameChange = (e) => {
        let value = e.target.value;
        
        // 최대 5글자로 제한
        if (value.length > 5) {
            value = value.substring(0, 5);
        }
        
        setName(value);
        setNameLen(value.length);
        validateName(value);
    };

    function formatPhoneNumber(value) {
        let digits = value.replace(/\D/g, '');
        
        digits = digits.substring(0, 11);
        digits = digits.replace(/^(\d{3})(?=\d)/, '$1-');
        digits = digits.replace(/^(...-....)(?=\d)/, '$1-');
        
        return digits;
    }

    const handlePhoneChange = (e) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhone(formatted);
        
        // 전화번호 유효성 검사: 010-XXXX-XXXX 형식인지 확인
        const phoneRegex = /^010-\d{4}-\d{4}$/;
        setIsValidPhone(phoneRegex.test(formatted));
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
                        className={`info-input-nickname ${nameError ? 'warn' : ''} ${name.length > 0 ? 'hasContent' : ''}`}
                        placeholder="이름을 입력해주세요"
                        value={name}
                        onChange={handleNameChange}
                        />
                    </div>
                    <div className="nickname-meta">
                        {nameError && <div className="nickname-warning">{nameError}</div>}
                        <div className="nickname-len">{nameLen}/5</div>
                    </div>
                </div>

                <div className="info-input-container">
                    <div className="info-input-title">연락처</div>
                    <div className="info-input-wrapper">
                        <input
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        className={`info-input ${phone.length > 0 ? 'hasContent' : ''}`}
                        placeholder="ex) 010-1234-5678"
                        value={phone}
                        onChange={handlePhoneChange}
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