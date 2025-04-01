import React, { useState } from 'react';
import styled from 'styled-components';
import T from '../../styles/pages/TypeTest/TypeTestStyle';
import { useNavigate } from 'react-router-dom';
import TypeQuestionSelect from '../../components/TypeTest/TypeQuestionSelect';
import TypeResult from './TypeResult';
const TypeTest = () => {
    const navigate = useNavigate();
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    if (completed) {
      return <TypeResult />;
    }
  
    if (started) {
      return (
        <TypeQuestionSelect
          setStarted={setStarted}
          setCompleted={setCompleted} // 결과로 전환하기 위한 콜백 전달
        />
      );
    }
      return (
        <div>
          <T.HeaderDiv>
            <T.HeaderArrow
              src="/assets/Main/back-arrow.svg"
              alt="뒤로"
              onClick={() => navigate("/mainpage")}
            />
            <T.HeaderText>가톨릭대학교 다맛제</T.HeaderText>
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
        </div>
      );
    };
    
  
  export default TypeTest;