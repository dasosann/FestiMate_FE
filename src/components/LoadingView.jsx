import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

const SpinnerContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden; /* 블러 띠가 경계를 벗어나지 않도록 */
`;

const Spinner = styled.img`
  width: 100%;
  height: 100%;
`;

const BlurOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 40px; /* 블러 띠의 폭 */
  height: 100%; /* 이미지 세로 전체 커버 */
  background-color: rgba(255, 255, 255, 0.5); /* 반투명 흰색 */
  filter: blur(8px); /* 블러 효과 */
  transform: translateY(-50%) translateX(-80%);
  animation: slide 2s ease-in-out infinite;

  @keyframes slide {
    0% {
      transform: translateY(-50%) translateX(-80%);
    }
    50% {
      transform: translateY(-50%) translateX(150%);
    }
    100% {
      transform: translateY(-50%) translateX(-80%);
    }
  }
`;

const LoadingView = () => {
  return (
    <Wrapper>
      <SpinnerContainer>
        <Spinner src="/assets/loading.svg" alt="로딩 중" />
        <BlurOverlay />
      </SpinnerContainer>
    </Wrapper>
  );
};

export default LoadingView;