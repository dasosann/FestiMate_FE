import React, { useState, useEffect } from 'react';
import R from '../../styles/pages/TypeTest/TypeResultStyle';
import { replace, useNavigate } from 'react-router-dom';
import T from '../../styles/components/TypeQuestionStyle';
import instance from '../../../axiosConfig';
import LoadingView from '../../components/LoadingView';

const festivalTypeImages = {
  INFLUENCER: '/assets/Card/inside-type-card.svg',
  NEWBIE: '/assets/Card/newbie-type-card.svg',
  PHOTO: '/assets/Card/photoshot-type-card.svg',
  PLANNER: '/assets/Card/plan-card.svg',
  HEALING: '/assets/Card/healing-type-card.svg',
  DEFAULT: '/assets/Card/newbie-type-card.svg',
};

const festivalTypeImagesPng = {
  INFLUENCER: '/assets/Card/inside-type-card.png',
  NEWBIE: '/assets/Card/newbie-type-card.png',
  PHOTO: '/assets/Card/photoshot-type-card.png',
  PLANNER: '/assets/Card/plan-card.png',
  HEALING: '/assets/Card/healing-type-card.png',
  DEFAULT: '/assets/Card/newbie-type-card.png',
};

const TypeResult = ({ festivalType, festivalId }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [image, setImage] = useState(
    festivalType && festivalTypeImages[festivalType]
      ? festivalTypeImages[festivalType]
      : festivalTypeImages.DEFAULT
  );
  const [shareImage, setShareImage] = useState(
    festivalType && festivalTypeImagesPng[festivalType]
      ? festivalTypeImagesPng[festivalType]
      : festivalTypeImagesPng.DEFAULT
  );
  const [showDownloadModal, setShowDownloadModal] = useState(false);

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
        navigate(`/festival/${festivalId}`, { replace: true });
      } catch (error) {
        console.error('사용자 정보 전송 실패, 축제 프로필 생성 실패', error);
        navigate('/mainpage',{replace:true})
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

  // 캔버스를 사용해 3/2 크기 PNG로 공유 (214x319px)
  const handleInstagramShare = async () => {
    try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = image;

        img.onload = async () => {
            const scale = 9;
            const padding = 1.5; // 이미지 주변 여백을 위한 패딩 배수
            const canvas = document.createElement('canvas');
            canvas.width = img.width * scale * padding;
            canvas.height = img.height * scale * padding;
            const ctx = canvas.getContext('2d');
            
            // 흰색 배경 설정
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 이미지를 중앙에 배치
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;
            
            // 이미지 그리기 (원본 비율 유지)
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

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

  // 다운로드 (SVG 기반 고해상도 PNG)
  const handleDownloadClick = async () => {
    try {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = image; // SVG 사용
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const scale = 2;
      const originalWidth = 321;
      const originalHeight = 479;
      const canvas = document.createElement('canvas');
      canvas.width = originalWidth * scale; // 642
      canvas.height = originalHeight * scale; // 958
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false; // 선명도 유지
      ctx.fillStyle = 'rgb(243, 243, 246)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, originalWidth, originalHeight);

      console.log('다운로드 캔버스 크기:', canvas.width, 'x', canvas.height);

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'mate-card.png';
      link.click();

      setShowDownloadModal(true);
      setTimeout(() => {
        setShowDownloadModal(false);
      }, 1300); // 애니메이션(0.3초) + 표시(1초)
    } catch (error) {
      console.error('다운로드 오류:', error);
      alert('다운로드 중 오류가 발생했습니다.');
    }
  };
  const isActive = count > 0;

  // Step 0: 결과 화면
  if (step === 0) {
    return (
      <R.MainWrapper style={{ overflowY: 'scroll', position: 'relative' }}>
        <R.HeaderDiv>
          <R.Left />
          <R.Center>유형 테스트 결과</R.Center>
          <R.Right>
            <a
              href={shareImage} // PNG 이미지 다운로드
              download="mate-card.png"
              onClick={handleDownloadClick}
            >
              <img src="/assets/TypeTest/download.svg" alt="다운" />
            </a>
          </R.Right>
        </R.HeaderDiv>
        <R.BodyWrapper style={{ paddingBottom: '71px' }}>
          <R.CardImg src={image} alt="매칭타입" /> {/* SVG 이미지 표시 */}
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
              opacity: showDownloadModal ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
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
              style={{ padding: '0 24px 0 0' }}
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
          <R.CheckDiv
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '20px',
              marginBottom: '4.07vh',
            }}
          >
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
        <T.NextButton
          onClick={handleNext}
          style={{ backgroundColor: '#ff6f61' }}
        >
          프로필 완성하기
        </T.NextButton>
      </div>
    );
  }

  return null;
};

export default TypeResult;