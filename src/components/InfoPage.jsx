import React, { useState } from 'react';
import '../styles/InfoPage.css';

const InfoPage = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [age, setAge] = useState('');
  const [school, setSchool] = useState('');
  const [gender, setGender] = useState(null);

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
      <div className="progress-circle">1</div>
      <h1 className="title">내 정보 입력</h1>
      
      <div className="input-group">
        <div className="label-wrapper">
          <label className="input-label">
            이름 <span className="required">*</span>
          </label>
          <span className="input-description">ⓘ 계좌 이체 시 확인용으로 사용되며, 공개되지 않아요</span>
        </div>
        <input
          type="text"
          className="input-field"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label className="input-label">
          닉네임 <span className="required">*</span>
        </label>
        <div className="nickname-wrapper">
          <input
            type="text"
            className="nickname-input"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <button 
            className={`duplicate-check ${isValidNickname ? 'active' : ''}`}
            disabled={!isValidNickname}
          >
            중복확인
          </button>
        </div>
        {nicknameError && <p className="input-error">{nicknameError}</p>}
        <p className="input-description">한글만 가능, 최소 1자 - 최대 10자</p>
      </div>
      
      <div className="input-group">
        <label className="input-label">
          나이 <span className="required">*</span>
        </label>
        <input
          type="number"
          className="input-field"
          placeholder="나이를 입력해주세요"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      
      <div className="input-group">
        <label className="input-label">
          성별 <span className="required">*</span>
        </label>
        <div className="gender-container">
          <button 
            className={`gender-btn ${gender === 'female' ? 'selected' : ''}`} 
            onClick={() => setGender('female')}
          >
            여자
          </button>
          <button 
            className={`gender-btn ${gender === 'male' ? 'selected' : ''}`} 
            onClick={() => setGender('male')}
          >
            남자
          </button>
        </div>
      </div>
      
      <div className="input-group">
        <label className="input-label">
          학교 <span className="info-icon">ⓘ</span>
        </label>
        <p className="input-description">학교 정보를 공개하고 싶지 않으시면 미입력해주세요</p>
        <input
          type="text"
          className="input-field"
          placeholder="예) 가톨릭대학교"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </div>
      
      <button 
        className={`next-btn ${name && isValidNickname && age && gender ? 'active' : ''}`} 
        onClick={handleNext}
      >
        다음
      </button>
    </div>
  );
};

export default InfoPage;
