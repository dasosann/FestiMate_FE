import React, { useState, useEffect } from 'react';
import '/src/styles/InfoPage/FirstSection.css';
import check from '/assets/InfoPage/check-coral.svg';

const FirstSection = () => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [isValidNickname, setIsValidNickname] = useState(false);
    const [age, setAge] = useState('');
    const [school, setSchool] = useState('');
    const [gender, setGender] = useState(null);
    const [year, setYear] = useState('');
    const [yearOption, setYearOption] = useState([]);
    
    

    useEffect(() => {
        const startYear = 1970;
        const endYear = new Date().getFullYear();
        const tmp = [];
        for(let i = endYear; i>=startYear; i--) tmp.push(i);
        setYearOption(tmp);
    },[]);


    const validateNickname = (value) => {
        const hangulRegex = /^[가-힣]+$/; // 한글만 허용
        if (!hangulRegex.test(value)) {
            setNicknameError('한글만 입력 가능합니다.');
            setIsValidNickname(false);
        } else if (value.length < 1 || value.length > 10) {
            setNicknameError('1자 이상 10자 이하로 입력해주세요.');
            setIsValidNickname(false);
        } else {
            setNicknameError('');
            setIsValidNickname(true);
        }
    };

    const handleNicknameChange = (e) => {
        const value = e.target.value;
        setNickname(value);
        validateNickname(value);
    };

    const handleNext = () => {
        if (name && isValidNickname && age && gender) {
            console.log('다음 페이지로 이동');
        }
    };

  return (
    <div className="info-container">
        <div className="info-phrase">
            매칭에 사용될 <span className="point-color">나의 정보</span>를 입력해주세요!
        </div>
        <div className="info-explain"><img src={check} />매칭 시 상대방에게 제공되는 정보입니다.</div>

        <div className="info-input-container">
            <div className="info-input-title">닉네임</div>
                <div className="info-input-wrapper">
                <input type="text" className="info-input" placeholder='닉네임을 입력해주세요' />
                <button className="nickname-check-button">중복확인</button>
            </div>
            <div className="nickname-len">0/6</div>
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
            <div className="nickname-len">0/6</div>
        </div>
    </div>
  );
};

export default FirstSection;
