import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '/src/styles/InfoPage/SecondSection.css';
import check from '/assets/InfoPage/check-coral.svg';
import instance from '../../../axiosConfig';

const SecondSection = ({setCurrentPage, nickname, setNickname, 
    gender, setGender, year, setYear, isSecondSectionValid, setIsSecondSectionValid, canPass, setCanPass}) => {

    const [nicknameError, setNicknameError] = useState('');
    const [isValidNickname, setIsValidNickname] = useState(false);
    const [nicknameLen, setNicknameLen] = useState(0);
    const [yearOption, setYearOption] = useState([]);
    
    // 초기 세팅 - 최초 진입 시 전부 입력하고, 중복확인까지 했다고 가정
    useEffect(() => {
        // 초기 진입 시에만 실행되는 코드
        if (nickname) {
            validateNickname(nickname);
            setNicknameLen(nickname.length);
            // 닉네임이 있고, canPass가 true면 isSecondSectionValid도 true로 복원
            if (canPass && year && gender) {
                setIsSecondSectionValid(true);
            }
        }
    }, []);

    // 기본 연도 옵션 설정
    useEffect(() => {
        const startYear = 1970;
        const endYear = new Date().getFullYear();
        const tmp = [];
        for(let i = endYear; i>=startYear; i--) tmp.push(i);
        setYearOption(tmp);
    }, []);

    // canPass 상태가 변경될 때마다 버튼 활성화 상태 업데이트
    // 조건 2: 허용되는 닉네임일 때, 나머지 필드도 채워져 있다면 isSecondSectionValid를 true로 설정
    useEffect(() => {
        if (canPass && nickname && year && gender) {
            setIsSecondSectionValid(true);
        } else {
            setIsSecondSectionValid(false);
        }
    }, [canPass, nickname, year, gender, setIsSecondSectionValid]);

    const validateNickname = (value) => {
        const regex = /^[가-힣a-zA-Z]+$/; // 한글과 영어만 허용
        if (!regex.test(value)) {
            setNicknameError('한글과 영어만 입력 가능합니다.');
            setIsValidNickname(false);
        } else {
            setNicknameError(null);
            setIsValidNickname(true);
        }
    };

    const isDuplicatedNickname = async () => {
        const checkNickname = async () => {
            try {
                const result = await instance.post(`/v1/users/validate-nickname?nickname=${nickname}`);
                
                if(result.status==200) {
                    setCanPass(true); // 닉네임 허용됨
                }
                else if(result.status==409) { 
                    setCanPass(false);
                    setNicknameError("중복된 닉네임입니다. 다시 입력해주세요.");
                }
            } catch (error) {
                console.error("[duplicate check API Error] GET /v1/users/validate-nickname:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
            }
        }
        
        checkNickname();
    };

    const handleNicknameChange = (e) => {
        let value = e.target.value;
        if(nicknameLen >= 6) {
            value = value.substring(0, 6);
        }
        // 닉네임이 기존 값과 다를 때만 canPass와 isSecondSectionValid를 false로 설정
        if (value !== nickname) {
            setCanPass(false);
            setIsSecondSectionValid(false);
        }
        validateNickname(value);
        setNickname(value);
        setNicknameLen(value.length);
    };

    // 조건 3: 다음 버튼 활성화 여부는 isSecondSectionValid를 통해 결정
    const handleNext = () => {
        if (isSecondSectionValid) {
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
                            className={`info-input-nickname ${nicknameError ? 'warn' : ''} ${nickname.length > 0 ? 'hasContent' : ''}`}
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
                            className={`info-input ${year ? 'year-selected hasContent' : 'year-empty'}`}
                            onChange={e => setYear(e.target.value)} 
                        >
                            <option value="">연도 선택</option>
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
                    className={`next-button ${isSecondSectionValid ? 'active' : 'inactive'}`}
                    onClick={handleNext}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default SecondSection;