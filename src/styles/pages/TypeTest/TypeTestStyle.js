import styled from "styled-components";
const T = {};
T.HeaderDiv = styled.div`
    width: 100%;
    height: 43px;
    display: flex;
    align-items: center;
    position: relative;
`
T.HeaderText = styled.span`
    color: #000;
    font-size: 15px;
    font-weight: 600;
    position: absolute;
    left: 50%;
    transform: translateX(-50%); /* 가로로 정확히 중앙 배치 */
`
T.HeaderArrow = styled.img`
    width:43px;
    height: 43px;
    cursor: pointer;
`
T.MainBody = styled.div`
    height: calc(100dvh - 43px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
`
T.MainDiv =styled.div`
    font-size: 20px;
    line-height: 140%;
    font-weight: 700;
    color: #171717;
`
T.SubDiv = styled.div`
    margin-top: 15px;
    font-size: 13px;
    line-height: 140%;
    font-weight: 500;
    color: #999aab;
`
T.MainImg = styled.img`
    width: 343px;
    height: 343px;
    margin-top:57px ;
`
T.StartButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 61px;
    /* background-color:${(props)=>props.isActive ? "#FF6F61" : "#d5d5de" }; */
    background-color: #ff6f61;
    font-size: 15px;
    line-height: 140%;
    font-weight: 600;
    color: #fff;
    position: fixed;
    bottom: 0;
    max-width:430px ;
`
T.ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: #f3f3f6;
  overflow: hidden;
`;
T.ProgressBar = styled.div`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #3a3c42;
  transition: width 0.5s ease;  /* 서서히 증가하는 애니메이션 */
`;
export default T;