import styled from "styled-components";

const I ={};

I.HeaderDiv = styled.div`
    width: 100%;
    height: 43px;
    margin-bottom: 9px;
    text-align: left;
`
I.BodyDiv=styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 16px 0 16px;
    padding-bottom: calc(35px + env(safe-area-inset-bottom,0px));
    gap: 12px;
    height: calc(100dvh - 43px);
`
I.TitleDiv=styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #000;
`
I.DetailDiv=styled.div`
    height: 20px;
    font-size:11px;
    color: #999aab;
    font-weight: 500;
    line-height: 140%;
    display: flex;
    align-items: center;
    gap: 5px;
`
I.CodeInput =styled.input`
    width: 100%;
    height: 48px;
    font-size: 13px;
    font-weight: 600;
    color: #3a3c42;
    padding: 15px 11px;
    border: 1px solid ${({ isError }) => (isError ? "#ff3636" : "#e6e6eb")};
    outline: none;
    border-radius: 7px;
    &::placeholder{
        font-size: 13px;
        line-height: 140%;
        color: #d5d5de;
    }
      &:focus {
        border: 1px solid ${({ isError }) => (isError ? "#ff3636" : "#000")}; /* 포커스 상태에서도 유지 */
    }
    
`
I.CodeSubmitButton = styled.button`
    width: 100%;
    height: 55px;
    border: none;
    border-radius: 9px;
    background-color: ${(props)=>props.isActive ? "#ff6f61" : "#d5d5de"};
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    margin-top: auto
`
I.InvalidCodeText= styled.div`
    font-size: 11px;
    line-height: 140%;
    font-weight: 500;
    color: #ff3636;
    margin-top: -8px;

`
I.ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 1999; 
`;

I.ConfirmModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 136px
  height:auto;
  width: 305px;
  background: #fff;
  padding: 13px 11px;
  z-index: 2000; 
  border-radius: 13px;
  text-align: center;
`;

I.ModalTitle = styled.div`
  height: 25px;
  display: flex;
  align-items:center;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin-bottom: 4px;
`;
I.SubTitle=styled.div`
    font-size: 15px;
    font-weight: 500;
    line-height: 140%;
    color: #575a63;
    margin-bottom: 13px;
`
I.ModalContent = styled.p`
  font-size: 15px;
  color: #575a63;
  font-weight: 500;
  margin-top: 4px;
  margin-bottom: 18px;
`;

I.ModalButtonWrapper = styled.div`
  display: flex;
  gap : 7px;
`;

I.ModalButton = styled.button`
all: unset;
box-sizing: border-box;
  width: 48%;
  padding: 13px 0px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: 7px;
  cursor: pointer;
  height: 47px;
`;
export default I;