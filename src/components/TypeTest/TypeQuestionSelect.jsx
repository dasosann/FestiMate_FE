import React, { useState } from 'react';
import T from '../../styles/components/TypeQuestionStyle';
import { useNavigate } from 'react-router-dom';
import instance from '../../../axiosConfig';

const TypeQuestionSelect = ({ setStarted, setCompleted, setFestivalType }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(20); // 진행 상태
  const step = 20; // 한 번에 증가할 단계 (10%씩 증가)
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
      console.log("제출 데이터:", answers);
      const submitData = {
        q1: answers[0],
        q2: answers[1],
        q3: answers[2],
        q4: answers[3],
        q5: answers[4]
      };

      try {
        const response = await instance.post('/v1/participants/type', submitData);
        console.log('서버 응답:', response.data);
        setFestivalType(response.data.data.typeResult);
        setCompleted(true);
      } catch (error) {
        console.error('데이터 전송 실패:', error);
        alert('답변 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
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
    console.log(optionIndex);
    console.log("배열", answers);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = optionIndex === 0; // 첫 번째 선택지 true, 두 번째 false
    setAnswers(updatedAnswers);
  };

  // 네 번째 질문(인덱스 3)일 때 텍스트를 두 줄로 나누어 렌더링
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