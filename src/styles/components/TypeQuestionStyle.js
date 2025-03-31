import styled from "styled-components";
const T = {};
T.NextButton = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 61px;
    background-color:${(props)=>props.isActive ? "#FF6F61" : "#d5d5de" };
    font-size: 15px;
    line-height: 140%;
    font-weight: 600;
    color: #fff;
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
T.HeaderDiv = styled.div`
    width: 100%;
    height: 43px;
    text-align: left;
`
T.MainWrapper = styled.div`
  height: calc(100dvh - 49px);
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 28px 16px ;
`
T.IndexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 27px;
  height: 27px;
  border-radius: 100%;
  background-color: #ff6f61;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
`
T.MainDiv =styled.div`
    text-align: start;
    font-size: 20px;
    line-height: 140%;
    font-weight: 700;
    color: #000;
    margin-top: 11px;
    margin-bottom: 133px;
`
T.OptionDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 71px;
  border-radius: 9px;
  background-color: ${(props) => props.selected ? "#f3f3f6" : "#fff"}; /* Set selected background color */
  border: ${(props) => props.selected ? "1px solid #3a3c42" : "1px solid #e6e6eb"}; /* Set selected border */
  color: ${(props) => props.selected ? "#3a3c42" : "#575a63"}; /* Set selected text color */
  font-size: 15px;
  font-weight: 600;
  line-height: 140%;
  padding: 25px 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
T.OptionWrapper=  styled.div`
  display: flex;
  gap: 16px;
  display: flex;
  flex-direction: column;
`
export default T;