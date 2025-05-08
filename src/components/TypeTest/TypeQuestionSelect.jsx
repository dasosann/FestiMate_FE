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

  const questions = [/* 기존 questions 배열 유지 */];

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
      console.log("제출 데이터:", answers);
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
        console.log('서버 응답:', response.data);
        setFestivalType(response.data.data.typeResult);
        setCompleted(true);
      } catch (error) {
        console.error('데이터 전송 실패:', error);
        alert('답변 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
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