import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-mobile-datepicker';
import '/src/styles/InfoPage/SecondSection.css';
import check from '/assets/InfoPage/check-coral.svg';
import WheelPicker from 'react-simple-wheel-picker';

const FirstSection = () => {
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
        setYear(tmp[0].toString());
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
        let value = e.target.value;
        if(nicknameLen >= 6) {
            value = value.substring(0, 6);
        }
        validateNickname(value);
        setNickname(value);
        setNicknameLen(value.length);
    };

    const handleNext = () => {
        if (nickname && isValidNickname && age && gender) {
            console.log('다음 페이지로 이동');
        }
    };

    const handleGenderChange = () => {

    }
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
                            className="info-input" 
                            placeholder='닉네임을 입력해주세요'
                            value={nickname}
                            onChange={handleNicknameChange}/>
                        <button className="nickname-check-button">중복확인</button>
                    </div>
                    <div className="nickname-len">{nicknameLen}/6</div>
                </div>
                <div className="info-input-container">
                    <div className="info-input-title">출생연도</div>
                    <div className="info-input-wrapper">
                        <div style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}>
                        <h3>출생연도 선택: {year}년</h3>
                        <WheelPicker
                            data={yearOption.map((y) => ({id: y.toString, value: y.toString()}))}
                            selectedID={year}
                            onChange={(target) => setYear(target.value)}
                            colorConfig={{
                                defaultColor: '#999',
                                selectedColor: '#000',
                            }}
                            containerStyle={{
                                backgroundColor: '#f5f5f5',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            }}
                        />
                        </div>
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

export default FirstSection;
