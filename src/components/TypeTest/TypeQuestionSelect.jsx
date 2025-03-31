import React, { useState } from 'react';
import T from '../../styles/components/TypeQuestionStyle';
import { useNavigate } from 'react-router-dom';
const TypeQuestionSelect = ({setStarted,setCompleted}) => {
  const navigate= useNavigate();
  const [progress, setProgress] = useState(0); // 진행 상태
  const step = 25; // 한 번에 증가할 단계 (10%씩 증가)
  const [answers, setAnswers] = useState([null, null, null, null, null]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const questions = [
    {
      question: "페스티벌에서 함께하고 싶은 사람은?",
      options: [
        "새로운 사람도 환영! 인스타 맞팔 ㄱㄱ",
        "친구랑만 다닐고얌..."
      ]
    },
    {
      question: "페스티벌에 자주 오시나요?",
      options: [
        "나는야 페스티벌 매니아! 나만 따라와",
        "나는야 페스티벌 뉴비! 축제 잘 몰라우웅"
      ]
    },
    {
      question: "페스티벌을 기록하는 방식은?",
      options: [
        "사진, 영상 필수! 인스타 폭풍 업로드!",
        "눈으로 귀로 담아갑니다~"
      ]
    },
      {
        question: "페스티벌을 즐기기 위해 준비하는 나의 모습은?",
        options: [
          "축제 부스, 먹거리, 동선, 타임테이블 그리고 ...",
          "누구보다 잘 즐길 체력만 준비해가면 돼!"
        ]
      },
      {
        question: "페스티벌에서 함께하고 싶은 사람은?",
        options: [
          "인디, 재즈, 발라드 난 분위기를 즐길거야~",
          "EDM, 힙합, K-POP 신나는 빌트 필수!"
        ]
      }
    ];
    const handleBackClick = useCallback(() => {
      if (currentQuestionIndex > 0) {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = null;
        setAnswers(updatedAnswers);
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        setProgress((prev) => {
          const nextProgress = prev - step;
          return nextProgress < 0 ? 0 : nextProgress;
        });
      } else {
        setStarted(false);
      }
    }, [answers, currentQuestionIndex, step, setStarted]);
    const questionText = questions[currentQuestionIndex].question;
    const choices = questions[currentQuestionIndex].options;
    const isActive = answers[currentQuestionIndex] !== null;
    useEffect(() => {
      // popstate 이벤트가 발생했을 때 뒤로가기 로직을 수행
      const onPopState = (e) => {
        e.preventDefault(); 
        handleBackClick();
        // 뒤로가기를 가로챈 뒤, 원래 브라우저 뒤로가기는 막고
        // 질문 인덱스만 변경하도록 처리
        // 여기서 막는 이유는 실제 URL 이동(라우팅)이 아니라 컴포넌트 상태만 변경하기 때문
        // 필요한 경우 history.pushState 등으로 히스토리를 조작해줄 수도 있음
      };
  
      // 이벤트 등록
      window.addEventListener('popstate', onPopState);
  
      return () => {
        // 컴포넌트가 unmount될 때 이벤트 해제
        window.removeEventListener('popstate', onPopState);
      };
    }, [handleBackClick]);
    const handleNextClick = () => {
      if (answers[currentQuestionIndex] === null) {
        alert('답변을 선택해주세요.');
        return;
      }
      if (currentQuestionIndex === questions.length - 1) {
        // 제출 전에 필요한 검증 로직을 추가할 수 있음
        console.log("제출 데이터:", answers);
        setCompleted(true);
        return;

      }
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setProgress((prev) => {
        const nextProgress = prev + step;
        return nextProgress > 100 ? 100 : nextProgress;
      });
    };
    const handleBackClick = () => {
      if (currentQuestionIndex > 0) {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = null;
        setAnswers(updatedAnswers);
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        setProgress((prev) => {
          const nextProgress = prev - step;
          return nextProgress < 0 ? 0 : nextProgress;
        });
      } else {
        setStarted(false)
      }
    };
    const handleOptionClick = (optionIndex) => {
      console.log(optionIndex)
      console.log("배열",answers)
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = optionIndex === 0 ; // 첫 번째 선택지 true, 두 번째 false
      setAnswers(updatedAnswers);
    };
    return (
         <div>
             <T.HeaderDiv>
                <img src="/assets/Main/back-arrow.svg" alt="뒤로" onClick={handleBackClick} />
            </T.HeaderDiv>
            <T.ProgressBarContainer>
                <T.ProgressBar progress={progress}/>
            </T.ProgressBarContainer>
            <T.MainWrapper>
              <T.IndexDiv>
                {currentQuestionIndex+1}
              </T.IndexDiv>
              <T.MainDiv>{questionText}</T.MainDiv>
              <T.OptionWrapper>
                {choices.map((choice, idx) => {
                  const isSelected = answers[currentQuestionIndex] === (idx===0);
                  // 선택된 옵션과 비교하여 스타일을 다르게 적용  
                  return (
                    <T.OptionDiv key={idx} onClick={() => handleOptionClick(idx)} selected = {isSelected}>
                      <span>{choice}</span>
                      {isSelected && <img src='/assets/TypeTest/checkedImg.svg' alt='checked'/>}
                    </T.OptionDiv>
                  );
                })}
              </T.OptionWrapper>
            </T.MainWrapper>
            <T.NextButton onClick={handleNextClick} isActive={isActive}>
                {currentQuestionIndex === questions.length - 1 ? "완료" : "다음"}
            </T.NextButton>
            
         </div>
    );
};

export default TypeQuestionSelect;