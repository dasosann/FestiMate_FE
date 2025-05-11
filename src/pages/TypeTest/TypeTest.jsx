import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import T from '../../styles/pages/TypeTest/TypeTestStyle';
import TypeQuestionSelect from '../../components/TypeTest/TypeQuestionSelect';
import TypeResult from './TypeResult';

const TypeTest = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [festivalType, setFestivalType] = useState(null); // 축제 유형 상태 추가
  const location = useLocation(); // 라우터 상태에서 festivalId 추출
  const festivalId = location.state?.festivalId;
  const festivalName = location.state?.festivalName;
  // 1) 컴포넌트가 처음 마운트될 때,  
  //    "현재" 히스토리 기록을 우리 상태({ started:false, completed:false })로 교체
  //    -> 뒤로가기 했을 때 e.state가 없거나 엉뚱한 값이 들어오는 것을 방지
  useEffect(() => {
    window.history.replaceState(
      { started: false, completed: false },
      '',
      '/mainpage' // 주소 표시줄은 그냥 /festivaltype 으로
    );
  }, []);
  
  // 2) started나 completed가 바뀔 때마다 pushState
  //    -> “이전 상태로 돌아갈 수 있는” 히스토리 스택을 계속 쌓는다.
  //       (뒤로가기를 누르면 popstate가 발생하고, e.state에는 pushState()로 넣었던 객체가 담김)
  useEffect(() => {
    // pushState(상태객체, 제목, url)
    // 여기서 url을 '' 로 두면 주소는 그대로 /festivaltype 을 유지
    window.history.pushState({ started, completed }, '', '/mainpage');
  }, [started, completed]);

  // 3) popstate 이벤트로 “하드웨어 뒤로가기” 제어하기
  useEffect(() => {
    const handlePopState = (e) => {
      // e.state가 undefined인 경우가 있을 수 있으니 방어 코딩
      const state = e.state;
      if (!state) {
        // state가 없으면 보통은 브라우저가 이전 라우트로 이동하려고 하는 상황.
        // 원래라면 /festivaltype 이전 라우트로 빠져나감
        // 원하시는 동작이 있다면 여기서 navigate("/mainpage")처럼 처리 가능
        navigate('/mainpage');
        return;
      }

      // state.started / state.completed 를 꺼내서 컴포넌트 상태 갱신
      const { started: prevStarted, completed: prevCompleted } = state;
      setStarted(prevStarted);
      setCompleted(prevCompleted);

      // “만약 started도 false이고 completed도 false라면, 
      //  즉 맨 처음 상태로 돌아갔다면 /mainpage로 이동한다” 같은 로직을 넣을 수도 있음.
      // if (!prevStarted && !prevCompleted) {
      //   navigate('/mainpage');
      // }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  // (이전과 동일한 분기 로직)
  if (completed) {
    return <TypeResult festivalType={festivalType} festivalId={festivalId}/>;
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

  // "시작 전" 화면
  return (
    <div style={{position:'relative'}}>
      <T.HeaderDiv>
        <T.HeaderArrow
          src="/assets/Main/back-arrow.svg"
          alt="뒤로"
          onClick={() => navigate('/mainpage')} 
          // 기본 뒤로가기 버튼 눌렀을 때 하던 동작대로
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
      <T.BalloonImg src="/assets/TypeTest/balloon.svg" alt="한 번 완성된 페스티벌 유형은 변경이 어려워요" />
    </div>
  );
};

export default TypeTest;
