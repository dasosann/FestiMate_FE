import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import T from '../../styles/pages/TypeTest/TypeTestStyle';
import I from '../../styles/pages/Main/InputCodeStyle';
import TypeQuestionSelect from '../../components/TypeTest/TypeQuestionSelect';
import TypeResult from './TypeResult';

const TypeTest = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const festivalId = parseInt(queryParams.get('festivalId'), 10);
  const festivalName = decodeURIComponent(queryParams.get('festivalName') || '');

  // Initialize states with values from session storage
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [festivalType, setFestivalType] = useState(null);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  
   const allowExit = useRef(false);

  // 파라미터 검증
  useEffect(() => {
    if (!festivalId || isNaN(festivalId) || !festivalName) {
      alert('잘못된 접근입니다.');
      navigate('/mainpage', { replace: true });
    }
  }, [festivalId, festivalName, navigate]);

  // 모바일/브라우저 뒤로가기 가로채기
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const onPopState = (e) => {
      if (allowExit.current) return;
      e.preventDefault();
      setIsExitModalOpen(true);
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // 모달 확인
  const handleConfirmExit = () => {
    allowExit.current = true;
    setIsExitModalOpen(false);
    navigate('/mainpage', { replace: true });
  };

  // 모달 취소
  const handleCancelExit = () => {
    setIsExitModalOpen(false);
  };

  return (
    <>
      {/* 화면 분기 */}
      {completed ? (
        <TypeResult
          festivalType={festivalType}
          festivalId={festivalId}
          setIsExitModalOpen={setIsExitModalOpen}
        />
      ) : started ? (
        <TypeQuestionSelect
          setStarted={setStarted}
          setCompleted={setCompleted}
          setFestivalType={setFestivalType}
          festivalId={festivalId}
          setIsExitModalOpen={setIsExitModalOpen}
        />
      ) : (
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
            <T.MainImg
              src="/assets/TypeTest/MainImg.svg"
              alt="메인이미지"
            />
          </T.MainBody>
          <T.StartButton onClick={() => setStarted(true)}>
            시작하기
          </T.StartButton>
          <T.BalloonImg
            src="/assets/TypeTest/balloon.svg"
            alt="한 번 완성된 페스티벌 유형은 변경이 어려워요"
          />
        </div>
      )}

      {/* 모달: 항상 렌더링 */}
      {isExitModalOpen && (
        <>
          <I.ModalOverlay onClick={handleCancelExit} />
          <I.ConfirmModal style={{height:'136px'}}>
            <I.ModalTitle>페스티벌 입장을 중단하시겠습니까?</I.ModalTitle>
            <I.SubTitle>입장 중단 시 입력 내용은 저장되지 않습니다</I.SubTitle>
            <I.ModalButtonWrapper>
              <I.ModalButton
                border="1px solid #e6e6eb"
                color="#7b7c87"
                backgroundColor="#fff"
                onClick={handleCancelExit}
              >
                취소
              </I.ModalButton>
              <I.ModalButton
                color="#fff"
                backgroundColor="#3a3c42"
                onClick={handleConfirmExit}
              >
                확인
              </I.ModalButton>
            </I.ModalButtonWrapper>
          </I.ConfirmModal>
        </>
      )}
    </>
  );
};

export default TypeTest;