import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '/src/styles/InfoPage/SecondSection.css';
import check from '/assets/InfoPage/check-coral.svg';

const SecondSection = ({setCurrentPage}) => {
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [isValidNickname, setIsValidNickname] = useState(false);
    const [nicknameLen, setNicknameLen] = useState(0);
    const [gender, setGender] = useState(null);
    
    const [year, setYear] = useState('');
    const [yearOption, setYearOption] = useState([]);
    const isFilled = nickname && year && gender;
    
    useEffect(() => {
        const startYear = 1970;
        const endYear = new Date().getFullYear();
        const tmp = [];
        for(let i = endYear; i>=startYear; i--) tmp.push(i);
        setYearOption(tmp);
        setYear(tmp[0]);
    },[]);


    const validateNickname = (value) => {
        const regex = /^[가-힣a-zA-Z]+$/; // 한글만 허용
        if (!regex.test(value)) {
            setNicknameError('한글과 영어만 입력 가능합니다.');
            setIsValidNickname(false);
        } else {
            setNicknameError('');
            setIsValidNickname(true);
        }
    };

    const handleNicknameChange = (e) => {
        let value = e.target.value;
        if(nicknameLen >= 6) {
            value = value.substring(0, 6);
        }
        validateNickname(value);
        setNickname(value);
        setNicknameLen(value.length);
    };

    const handleNext = () => {
        if (nickname && isValidNickname && year && gender) {
            setCurrentPage(prev => prev+1);
        }
    };

    return (
        <div className="info-container">
            <div className="info-phrase">
                매칭에 사용될 <span className="point-color">나의 정보</span>를 입력해주세요!
            </div>
            <div className="info-explain"><img src={check} />매칭 시 상대방에게 제공되는 정보입니다.</div>

            <div className="content-container">
                <div className="info-input-container">
                    <div className="info-input-title">
                        닉네임
                    </div>
                    <div className="info-input-wrapper">
                        <input 
                            type="text"
                            className={`info-input-nickname ${nicknameError ? 'warn' : ''}`}
                            placeholder='닉네임을 입력해주세요'
                            value={nickname}
                            onChange={handleNicknameChange}/>
                        <button className="nickname-check-button"
                                disabled={!isValidNickname}>
                            중복확인
                        </button>
                    </div>
                    <div className="nickname-meta">
                        <div className="nickname-warning">
                            { nicknameError ? nicknameError : null}
                        </div>
                        <div className="nickname-len">{nicknameLen}/6</div>
                    </div>
                </div>
                <div className="info-input-container">
                    <div className="info-input-title">출생연도</div>
                    <div className="info-input-wrapper">
                        <select 
                            value={year}
                            className="info-input"
                            onChange={e => setYear(e.target.value)} 
                        >
                            <option value="" style={{color: 'var(--gray03)'}}>연도 선택</option>
                            {yearOption.map((yr,idx) => (
                                <option key={`${yr}-${idx}`} value={yr}>
                                {yr}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="info-input-container">
                    <div className="info-input-title">성별</div>
                    <div className="gender-container">
                        <label className="gender-option">
                            <button 
                                className={`gender-box ${gender === 'male' ? 'selected' : ''}`}
                                onClick={() => setGender('male')}    
                            >
                                남자
                            </button>
                        </label>
                        <label className="gender-option">
                            <button 
                                className={`gender-box ${gender === 'female' ? 'selected' : ''}`}
                                onClick={() => setGender('female')}
                            >
                                여자
                            </button>
                        </label>
                    </div>
                </div>
                    <button
                        className={`next-button ${isFilled ? 'active' : 'inactive'}`}
                        onClick={handleNext}
                    >
                        다음
                    </button>
            </div>
        </div>
    );
};

export default SecondSection;
