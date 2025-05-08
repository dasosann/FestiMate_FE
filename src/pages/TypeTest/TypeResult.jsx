import React, { useState, useEffect } from 'react';
import R from '../../styles/pages/TypeTest/TypeResultStyle';
import { useNavigate } from 'react-router-dom';
import T from '../../styles/components/TypeQuestionStyle';
import instance from '../../../axiosConfig';
import LoadingView from '../../components/LoadingView';

const festivalTypeImages = {
  INFLUENCER: '/assets/Card/inside-type-card.svg',
  NEWBIE: '/assets/Card/newbie-type-card.svg',
  PHOTO: '/assets/Card/photoshot-type-card.svg',
  PLANNER: '/assets/Card/planning-type-card.svg',
  HEALING: '/assets/Card/healing-type-card.svg',
  DEFAULT: '/assets/Card/newbie-type-card.svg',
};

const TypeResult = ({ festivalType, festivalId }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(
    festivalType && festivalTypeImages[festivalType]
      ? festivalTypeImages[festivalType]
      : festivalTypeImages.DEFAULT
  );
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // 최소 1초 로딩 뷰 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    },1000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  const handleNext = async () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      if (!contactInfo) {
        alert('모든 연락 정보를 입력해주세요.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      console.log('제출 데이터:', { contactInfo, message, festivalId, festivalType });
      const submitData = {
        typeResult: festivalType,
        introduction: contactInfo,
        message: message,
      };
      try {
        const response = await instance.post(
          `v1/festivals/${festivalId}/participants`,
          submitData
        );
        console.log('모든정보 입력 후 응답', response);
        navigate('/mainpage');
      } catch (error) {
        console.error('사용자 정보 전송 실패, 축제 프로필 생성 실패', error);
        alert('프로필 제출 중 오류가 발생했습니다. 다시 시도해주세요');
      }
    }
  };

  const onChange = (e) => {
    setContactInfo(e.target.value);
    setCount(e.target.value.length);
  };

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
    setMessageCount(e.target.value.length);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleInstagramShare = async () => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = image;

      img.onload = async () => {
        const padding = 20;
        const canvasWidth = img.width + 2 * padding;
        const canvasHeight = img.height + 2 * padding;

        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#f3f3f6';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, padding, padding);

        canvas.toBlob(async (blob) => {
          if (!blob) {
            console.error('Blob 생성 실패');
            return;
          }
          const file = new File([blob], 'shared-image.png', { type: blob.type });

          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                files: [file],
                title: '내 페스티메이트 결과',
                text: '내 매칭 타입 결과를 확인해보세요!',
              });
              console.log('공유 성공');
            } catch (error) {
              console.error('공유 실패:', error);
            }
          } else {
            alert('이 기능은 해당 브라우저에서 지원되지 않습니다.');
          }
        });
      };

      img.onerror = (error) => {
        console.error('이미지 로드 실패:', error);
      };
    } catch (error) {
      console.error('이미지 공유 중 오류 발생:', error);
    }
  };

  const handleDownloadClick = () => {
    setShowDownloadModal(true);
    setTimeout(() => {
      setShowDownloadModal(false);
    }, 1000);
  };

  const isActive = count > 0;

  // 로딩 뷰 렌더링
  if (isLoading && step === 0) {
    return <LoadingView/>;
  }

  // Step 0: 결과 화면
  if (step === 0) {
    return (
      <R.MainWrapper style={{ overflowY: 'scroll', position: 'relative' }}>
        <R.HeaderDiv>
          <R.Left />
          <R.Center>유형 테스트 결과</R.Center>
          <R.Right>
            <a
              href="/assets/TypeTest/mate-card.png"
              download="mate-card.png"
              onClick={handleDownloadClick}
            >
              <img src="/assets/TypeTest/download.svg" alt="다운" />
            </a>
          </R.Right>
        </R.HeaderDiv>
        <R.BodyWrapper style={{ paddingBottom: '71px' }}>
          <R.CardImg src={image} alt="매칭타입" />
          <R.InstagramShare onClick={handleInstagramShare}>
            <img src="/assets/TypeTest/instagram-logo.svg" alt="insta" />
            <div>인스타로 공유하기</div>
          </R.InstagramShare>
        </R.BodyWrapper>
        <R.GoToInputButton onClick={handleNext}>
          연락 정보 입력하러 가기
        </R.GoToInputButton>
        {showDownloadModal && (
          <div
            style={{
              position: 'fixed',
              bottom: '35px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#3a3c42',
              fontSize: '13px',
              fontWeight: '600',
              color: '#fff',
              padding: '20px 108px',
              borderRadius: '5px',
              zIndex: 1000,
              width: '343px',
            }}
          >
            이미지가 저장되었습니다
          </div>
        )}
      </R.MainWrapper>
    );
  }

  // Step 1: 연락 정보 입력 화면
  if (step === 1) {
    return (
      <div>
        <T.HeaderDiv>
          <img src="/assets/Main/back-arrow.svg" alt="뒤로" onClick={handleBack} />
        </T.HeaderDiv>
        <R.DivWrapper>
          <R.TitleText>
            상대방에게 전달할 <br /> <R.RedSpan>연락 정보</R.RedSpan>를 작성해주세요
          </R.TitleText>
          <R.CheckDiv>
            <R.CheckedContainer>
              <img src="/assets/TypeTest/red-check.svg" alt="쳌" />
            </R.CheckedContainer>
            <span>
              인스타그램, 카카오톡 아이디, 전화번호 등
              <br />
              Festimate가 당신을 찾는데 필요한 정보를 적어주세요.
            </span>
          </R.CheckDiv>
          <R.InputDiv>
            <R.InputBox
              type="text"
              placeholder="ex) 난 인스타를 안 해서, 카카오톡 아이디 남길게 아이디는 @festimate야!"
              maxLength={49}
              onChange={onChange}
              value={contactInfo}
            />
            <R.TypingText>{count}/50</R.TypingText>
          </R.InputDiv>
        </R.DivWrapper>
        <R.PleaseReadDiv>
          <R.TitleSpan>꼭 읽어주세요!</R.TitleSpan>
          <span>
            정보가 잘못되거나 확실하지 않은 경우,
            <br />
            당신의 페스티메이트가 연락하지 못할 수도 있어요!
            <br />
            해당 연락 정보가 맞는지 한번 더 확인해보세요!
          </span>
        </R.PleaseReadDiv>
        <T.NextButton onClick={handleNext} isActive={isActive}>
          다음
        </T.NextButton>
      </div>
    );
  }

  // Step 2: 메시지 작성 화면
  if (step === 2) {
    return (
      <div>
        <T.HeaderDiv>
          <img src="/assets/Main/back-arrow.svg" alt="뒤로" onClick={handleBack} />
        </T.HeaderDiv>
        <R.DivWrapper>
          <R.TitleText>
            상대방에게 전달할 <br /> <R.RedSpan>메시지</R.RedSpan>를 작성해주세요
          </R.TitleText>
          <R.CheckDiv style={{ display: 'flex', alignItems: 'center', height: '20px', marginBottom: '4.07vh' }}>
            <R.CheckedContainer>
              <img src="/assets/TypeTest/red-check.svg" alt="쳌" />
            </R.CheckedContainer>
            <span>연락처와 함께 전달할 메시지입니다!</span>
          </R.CheckDiv>
          <R.InputDiv>
            <R.InputBox
              type="text"
              placeholder="연락을 통해 직접 대화해보세요!"
              maxLength={49}
              onChange={onChangeMessage}
              value={message}
            />
            <R.TypingText>{messageCount}/50</R.TypingText>
          </R.InputDiv>
        </R.DivWrapper>
        <R.PleaseReadDiv>
          <R.TitleSpan>꼭 읽어주세요!</R.TitleSpan>
          <span>
            해당 메세지 작성은 선택 사항이며,
            <br />
            한 자(띄어쓰기 포함)라도 입력시 해당 메세지가 함께 전달되니
            <br />
            이점 유의해 작성해주세요!
          </span>
        </R.PleaseReadDiv>
        <T.NextButton onClick={handleNext} style={{ backgroundColor: '#ff6f61' }}>
          프로필 완성하기
        </T.NextButton>
      </div>
    );
  }

  return null;
};

export default TypeResult;