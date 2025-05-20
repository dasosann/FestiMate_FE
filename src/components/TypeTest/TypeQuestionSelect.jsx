import React, { useState, useEffect } from 'react'; // useEffect 추가
import T from '../../styles/components/TypeQuestionStyle';
import { useNavigate } from 'react-router-dom';
import instance from '../../../axiosConfig';
import LoadingView from '../LoadingView';
const TypeQuestionSelect = ({ setStarted, setCompleted, setFestivalType, festivalId }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(20);
  const step = 20;
  const [answers, setAnswers] = useState([null, null, null, null, null]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

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
        "EDM, 힙합, K-POP 신나는 비트 필수!"
      ]
    }
  ];

  const questionText = questions[currentQuestionIndex].question;
  const choices = questions[currentQuestionIndex].options;
  const isActive = answers[currentQuestionIndex] !== null;

  const handleNextClick = async () => {
    if (answers[currentQuestionIndex] === null) {
      alert('답변을 선택해주세요.');
      return;
    }

    if (currentQuestionIndex === questions.length - 1) {
      setIsLoading(true); // 로딩 시작
      const submitData = {
        q1: answers[0],
        q2: answers[1],
        q3: answers[2],
        q4: answers[3],
        q5: answers[4],
      };

      try {
        // 최소 1초 보장
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));
        const response = await instance.post(`/v1/festivals/${festivalId}/participants/type`, submitData);
        await minLoadingTime; // 요청과 최소 1초 대기 병렬 처리
        setFestivalType(response.data.data.typeResult);
        setCompleted(true);
      } catch (error) {
        console.error('데이터 전송 실패:', error);
        navigate('/mainpage')
      } finally {
        setIsLoading(false); // 로딩 종료
      }
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
      setStarted(false);
    }
  };

  const handleOptionClick = (optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = optionIndex === 0;
    setAnswers(updatedAnswers);
  };

  const renderQuestionText = () => {
    if (currentQuestionIndex === 3) {
      return (
        <>
          페스티벌을 즐기기 위해 <br />
          준비하는 나의 모습은?
        </>
      );
    }
    return questionText;
  };

  // 로딩 뷰 렌더링
  if (isLoading) {
    return <LoadingView/>
  }

  return (
    <div>
      <T.HeaderDiv>
        <img src="/assets/Main/back-arrow.svg" alt="뒤로" onClick={handleBackClick} />
      </T.HeaderDiv>
      <T.ProgressBarContainer>
        <T.ProgressBar progress={progress} />
      </T.ProgressBarContainer>
      <T.MainWrapper>
        <T.IndexDiv>{currentQuestionIndex + 1}</T.IndexDiv>
        <T.MainDiv>{renderQuestionText()}</T.MainDiv>
        <T.OptionWrapper>
          {choices.map((choice, idx) => {
            const isSelected = answers[currentQuestionIndex] === (idx === 0);
            return (
              <T.OptionDiv key={idx} onClick={() => handleOptionClick(idx)} selected={isSelected}>
                <span>{choice}</span>
                {isSelected && <img src="/assets/TypeTest/checkedImg.svg" alt="checked" />}
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