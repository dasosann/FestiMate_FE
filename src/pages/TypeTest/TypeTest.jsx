import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import T from '../../styles/pages/TypeTest/TypeTestStyle';
import TypeQuestionSelect from '../../components/TypeTest/TypeQuestionSelect';
import TypeResult from './TypeResult';
import I from '../../styles/pages/Main/InputCodeStyle';

// 모달 스타일 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 80%;
  max-width: 343px;
`;

const ModalText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => props.$color || '#fff'};
  background-color: ${(props) => props.$bgColor || '#3a3c42'};
`;

const TypeTest = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [festivalType, setFestivalType] = useState(null);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const festivalId = queryParams.get('festivalId');
  const festivalName = decodeURIComponent(queryParams.get('festivalName') || '페스티벌');

  // popstate 이벤트로 하드웨어 뒤로가기 제어
  useEffect(() => {
    const handlePopState = () => {
      setIsExitModalOpen(true);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 모달 확인 버튼 핸들러
  const handleConfirmExit = () => {
    setIsExitModalOpen(false);
    navigate('/mainpage');
  };

  // 모달 취소 버튼 핸들러
  const handleCancelExit = () => {
    setIsExitModalOpen(false);
    // 현재 페이지를 유지하기 위해 히스토리 스택에 푸시
    window.history.pushState({}, '', '/festivaltype');
  };

  if (completed) {
    return <TypeResult festivalType={festivalType} festivalId={festivalId} />;
  }

  if (started) {
    return (
      <TypeQuestionSelect
        setStarted={setStarted}
        setCompleted={setCompleted}
        setFestivalType={setFestivalType}
        festivalId={festivalId}
      />
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <T.HeaderDiv>
        <T.HeaderArrow
          src="/assets/Main/back-arrow.svg"
          alt="뒤로"
          onClick={() => setIsExitModalOpen(true)}
        />
        <T.HeaderText>{festivalName}</T.HeaderText>
      </T.HeaderDiv>
      <T.MainBody>
        <T.MainDiv>
          페스티메이트 매칭을 위해<br />먼저 페스티벌 유형을 확인할게요!
        </T.MainDiv>
        <T.SubDiv>
          나의 유형과 찰떡궁합의 페스티메이트를 찾아드려요!
        </T.SubDiv>
        <T.MainImg src="/assets/TypeTest/MainImg.svg" alt="메인이미지" />
      </T.MainBody>
      <T.StartButton onClick={() => setStarted(true)}>
        시작하기
      </T.StartButton>
      <T.BalloonImg
        src="/assets/TypeTest/balloon.svg"
        alt="한 번 완성된 페스티벌 유형은 변경이 어려워요"
      />
      {isExitModalOpen && (
          <>
              <I.ModalOverlay onClick={() => setIsExitModalOpen(false)} />
              <I.ConfirmModal>
                  <I.ModalTitle>메인페이지로 돌아가시겠습니까?</I.ModalTitle>
                  <I.ModalButtonWrapper>
                      <I.ModalButton border="1px solid #e6e6eb" color="#7b7c87" backgroundColor="#fff" onClick={handleCancelExit}>취소</I.ModalButton>
                      <I.ModalButton color="#fff" backgroundColor="#3a3c42" onClick={handleConfirmExit}>확인</I.ModalButton>
                  </I.ModalButtonWrapper>
              </I.ConfirmModal>
          </>
      )}
    </div>
  );
};

export default TypeTest;