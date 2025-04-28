import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '/src/styles/InfoPage/SecondSection.css';
import check from '/assets/InfoPage/check-coral.svg';
import instance from '../../../axiosConfig';

const SecondSection = ({setCurrentPage, nickname, setNickname, 
    gender, setGender, year, setYear}) => {

    const [nicknameError, setNicknameError] = useState('');
    const [isValidNickname, setIsValidNickname] = useState(false);
    const [nicknameLen, setNicknameLen] = useState(0);
    const [yearOption, setYearOption] = useState([]);
    const [canPass, setCanPass] = useState(false);
    const isFilled = nickname && year && gender && isValidNickname && canPass;
    
    useEffect(() => {
        const startYear = 1970;
        const endYear = new Date().getFullYear();
        const tmp = [];
        for(let i = endYear; i>=startYear; i--) tmp.push(i);
        setYearOption(tmp);
        setYear(tmp[0]);

        console.log(nicknameError, nickname);
    },[]);


    const validateNickname = (value) => {
        const regex = /^[가-힣a-zA-Z]+$/; // 한글만 허용
        if (!regex.test(value)) {
            setNicknameError('한글과 영어만 입력 가능합니다.');
            setIsValidNickname(false);
        } else {
            setNicknameError(null);
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
        if (nickname && isValidNickname && year && gender && canPass) {
            setCurrentPage(prev => prev+1);
        }
    };
    const isDuplicatedNickname = async () => {
        try {
            const response = await instance.post('/v1/users/validate-nickname', {}, {
                params: { nickname: nickname }
              });
          console.log("중복응답",response)
          const isAvailable = response.data?.code;
          if (isAvailable===2000) {
            setCanPass(true);
            setNicknameError();
          }
          else if(isAvailable===4091){
            setCanPass(false);
            setNicknameError('이미 존재하는 닉네임입니다.');
          }
        } catch (error) {
          console.error('[Nickname Validation API Error] POST /v1/users/validate-nickname:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
          setCanPass(false);
          setNicknameError('닉네임 확인 중 오류가 발생했습니다.');
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
                                disabled={!isValidNickname}
                                onClick={isDuplicatedNickname}>
                            중복확인
                        </button>
                    </div>
                    <div className="nickname-meta">
                        <div className={nicknameError ? "nickname-warning" : (canPass ? "nickname-good" : null)}>
                            { nicknameError ? nicknameError : (canPass ? "사용 가능한 닉네임입니다." : null)}
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
                                className={`gender-box ${gender === 'man' ? 'selected' : ''}`}
                                onClick={() => setGender('man')}    
                            >
                                남자
                            </button>
                        </label>
                        <label className="gender-option">
                            <button 
                                className={`gender-box ${gender === 'woman' ? 'selected' : ''}`}
                                onClick={() => setGender('woman')}
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
