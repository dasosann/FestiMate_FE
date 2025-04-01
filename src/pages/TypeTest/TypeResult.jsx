import React, { useState } from 'react';
import R from '../../styles/pages/TypeTest/TypeResultStyle';
import { useNavigate } from 'react-router-dom';
import T from '../../styles/components/TypeQuestionStyle';

const TypeResult = () => {
  const navigate = useNavigate();
  // step: 0 - 결과 화면, 1 - 연락 정보 입력, 2 - 메시지 작성
  const [step, setStep] = useState(0);
  const [count,setCount]= useState(0);
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [image, setImage] = useState('/assets/TypeTest/mate-card.png');

  const handleNext = () => {
    if (step === 0) {
      // 결과 화면 → 연락 정보 입력 화면
      setStep(1);
    } else if (step === 1) {
      // 연락 정보 입력 화면 검증
      if (!contactInfo) {
        alert("모든 연락 정보를 입력해주세요.");
        return;
      }
      // 연락 정보 입력 완료 → 메시지 작성 화면
      setStep(2);
    } else if (step === 2) {
      // 최종 제출 (백엔드 API 호출 등)
      console.log("제출 데이터:", { contactInfo, message });
      // 예: axios.post('/api/completeProfile', { contactInfo, message });
      alert("프로필이 완성되었습니다!");
      // 제출 후, 원한다면 다른 페이지로 이동하거나 상태를 리셋할 수 있습니다.
      // navigate("/some-confirmation-page");
    }
  };
  const onChange = (e)=>{
    setContactInfo(e.target.value);
    console.log(contactInfo)
    setCount(e.target.value.length);
    console.log(count)
  }
  const onChangeMessage = (e)=>{
    setMessage(e.target.value);
    console.log(message)
    setMessageCount(e.target.value.length);
    console.log(messageCount)

  }
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  const handleInstagramShare = async () => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous"; // 필요 시 CORS 문제 방지
      img.src = image; // 동적으로 관리되는 이미지 URL
  
      img.onload = async () => {
        // 이미지 주변에 추가할 여백(padding) 설정
        const padding = 20; // 원하는 여백 크기 (픽셀 단위)
        // 캔버스 크기를 이미지 크기보다 padding 만큼 크게 설정
        const canvasWidth = img.width + 2 * padding;
        const canvasHeight = img.height + 2 * padding;
  
        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext("2d");
  
        // 캔버스 전체에 배경색 채우기
        ctx.fillStyle = "#f3f3f6"; // 원하는 배경색
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
        // 이미지 중앙에 배치: padding 만큼의 오프셋을 줍니다.
        ctx.drawImage(img, padding, padding);
  
        // canvas를 Blob으로 변환하여 공유
        canvas.toBlob(async (blob) => {
          if (!blob) {
            console.error("Blob 생성 실패");
            return;
          }
          const file = new File([blob], "shared-image.png", { type: blob.type });
          
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                files: [file],
                title: '내 페스티메이트 결과',
                text: '내 매칭 타입 결과를 확인해보세요!'
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
        console.error("이미지 로드 실패:", error);
      };
    } catch (error) {
      console.error('이미지 공유 중 오류 발생:', error);
    }
  };
  
  const isActive = count > 0;
  // Step 0: 기존 결과 화면
  if (step === 0) {
    return (
      <R.MainWrapper style={{overflowY:'scroll'}}>
        <R.HeaderDiv>
          <R.Left />
          <R.Center>유형 테스트 결과</R.Center>
          <R.Right>
            <a href="/assets/TypeTest/mate-card.png" download="mate-card.png">
                <img src='/assets/TypeTest/download.svg' alt='다운' />
            </a>
          </R.Right>
        </R.HeaderDiv>
        <R.BodyWrapper style={{paddingBottom:'71px'}}>
          <R.CardImg src='/assets/TypeTest/mate-card.svg' alt='매칭타입' />
          <R.InstagramShare onClick={handleInstagramShare}>
            <img src="/assets/TypeTest/instagram-logo.svg" alt="insta"  />
            <div>인스타로 공유하기</div>
          </R.InstagramShare>
        </R.BodyWrapper>
        <R.GoToInputButton onClick={handleNext}>
          연락 정보 입력하러 가기
        </R.GoToInputButton>
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
                상대방에게 전달할 <br/> <R.RedSpan>연락 정보</R.RedSpan>를 작성해주세요
            </R.TitleText>
            <R.CheckDiv>
                <R.CheckedContainer><img src="/assets/TypeTest/red-check.svg" alt="쳌" /></R.CheckedContainer>
                <span>인스타그램, 카카오톡 아이디, 전화번호 등<br/>Festimate가 당신을 찾는데 필요한 정보를 적어주세요.</span>
            </R.CheckDiv>
            <R.InputDiv>
                <R.InputBox type='text' placeholder='연락 정보를 작성해주세요' maxLength={49} onChange={onChange} value={contactInfo}/>
                <R.TypingText>{count}/50</R.TypingText>
            </R.InputDiv>
          </R.DivWrapper>
          <R.PleaseReadDiv>
              <R.TitleSpan>꼭 읽어주세요!</R.TitleSpan>
              <span>정보가 잘못되거나 확실하지 않은 경우,<br/>당신의 페스티메이트가 연락하지 못할 수도 있어요!<br/>해당 연락 정보가 맞는지 한번 더 확인해보세요!</span>
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
                상대방에게 전달할 <br/> <R.RedSpan>메시지</R.RedSpan>를 작성해주세요
            </R.TitleText>
            <R.CheckDiv style={{display:'flex', alignItems:'center',height:'20px',marginBottom:'4.07vh'}}>
                <R.CheckedContainer><img src="/assets/TypeTest/red-check.svg" alt="쳌" /></R.CheckedContainer>
                <span>연락처와 함께 전달할 메시지입니다!</span>
            </R.CheckDiv>
            <R.InputDiv>
                <R.InputBox type='text' placeholder='연락을 통해 직접 대화해보세요!' maxLength={49} onChange={onChangeMessage} value={message}/>
                <R.TypingText>{messageCount}/50</R.TypingText>
            </R.InputDiv>
          </R.DivWrapper>
          <R.PleaseReadDiv>
              <R.TitleSpan>꼭 읽어주세요!</R.TitleSpan>
              <span>해당 메세지 작성은 선택 사항이며,<br/>한 자(띄어쓰기 포함)라도 입력시 해당 메세지가 함께 전달되니<br/>이점 유의해 작성해주세요!</span>
            </R.PleaseReadDiv>
          <T.NextButton onClick={handleNext} style={{backgroundColor:'#ff6f61'}}>
            프로필 완성하기
          </T.NextButton>
    </div>
    );
  }

  return null;
};

export default TypeResult;
