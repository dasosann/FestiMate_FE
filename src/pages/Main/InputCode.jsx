import React, { useState } from 'react';
import I from '../../styles/pages/Main/InputCodeStyle';
import { useNavigate } from 'react-router-dom';
import instance from '../../../axiosConfig';

const InputCode = () => {
  const [codeValue, setCodeValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('유효하지 않은 초대 코드입니다.');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [festivalName, setFestivalName] = useState('');
  const [category, setCategory] = useState('');
  const [festivalId, setFestivalId] = useState();
  const navigate = useNavigate();

  const CATEGORY_LOGOS = {
    MUSIC: '/assets/Main/music-logo.svg',
    SCHOOL: '/assets/Main/school-logo.svg',
    LIFE: '/assets/Main/life-logo.svg',
  };

  const handleChange = (e) => {
    setCodeValue(e.target.value);
    if (codeValue.length > 0) {
      setIsError(false);
    }
  };

  const handleSubmit = async () => {
    if (!codeValue) {
      setIsError(true);
      alert('코드를 입력해주세요.');
      return;
    }

    try {
      const response = await instance.post('/v1/festivals/verify', {
        inviteCode: codeValue,
      });
      console.log('페스티벌 코드 응답', response);
      const { code, data } = response.data;

      if (code === 2000) {
        setFestivalName(data.title);
        setCategory(data.category);
        setFestivalId(data.festivalId);
        setIsModalOpen(true);
      } else if (code === 4013) {
        setIsError(true);
        setErrorMessage('초대 코드가 만료되었습니다.');
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const handleConfirmButton = () => {
    // 쿼리 파라미터로 festivalId와 festivalName 전달
    const queryParams = new URLSearchParams({
      festivalId: festivalId.toString(),
      festivalName: encodeURIComponent(festivalName), // 특수 문자 인코딩
    }).toString();
    navigate(`/festivaltype?${queryParams}`);
  };

  return (
    <div style={{ textAlign: 'left', height: 'calc(100dvh - env(safe-area-inset-bottom))' }}>
      <I.HeaderDiv>
        <img src="/assets/Main/back-arrow.svg" alt="뒤로" onClick={() => navigate('/mainpage')} />
      </I.HeaderDiv>
      <I.BodyDiv>
        <I.TitleDiv>페스티벌 입장하기</I.TitleDiv>
        <I.DetailDiv>
          <img src="/assets/Main/red-check.svg" alt="체크" />
          <span>참여하고 싶은 페스티벌의 초대 코드를 입력해주세요</span>
        </I.DetailDiv>
        <I.CodeInput
          type="text"
          placeholder="초대 코드 입력"
          value={codeValue}
          onChange={handleChange}
          isError={isError}
        />
        {isError && <I.InvalidCodeText>{errorMessage}</I.InvalidCodeText>}
        <I.CodeSubmitButton isActive={codeValue.length > 0} onClick={handleSubmit}>
          입장하기
        </I.CodeSubmitButton>
      </I.BodyDiv>
      {isModalOpen && (
        <>
          <I.ModalOverlay onClick={() => setIsModalOpen(false)} />
          <I.ConfirmModal>
            <img src={CATEGORY_LOGOS[category]} alt="카테고리" />
            <I.ModalTitle>입장하시겠습니까?</I.ModalTitle>
            <I.ModalContent>{festivalName}</I.ModalContent>
            <I.ModalButtonWrapper>
              <I.ModalButton
                border="1px solid #e6e6eb"
                color="#7b7c87"
                backgroundColor="#fff"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </I.ModalButton>
              <I.ModalButton
                color="#fff"
                backgroundColor="#3a3c42"
                onClick={handleConfirmButton}
              >
                확인
              </I.ModalButton>
            </I.ModalButtonWrapper>
          </I.ConfirmModal>
        </>
      )}
    </div>
  );
};

export default InputCode;