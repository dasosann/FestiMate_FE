import styled from "styled-components";

const I ={};

I.HeaderDiv = styled.div`
    width: 100%;
    height: 43px;
    margin-bottom: 9px;
`
I.BodyDiv=styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 16px 110px 16px;
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
    border-radius: 7px;
    &::placeholder{
        font-size: 13px;
        line-height: 140%;
        color: #d5d5de;
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
    margin-top: auto;
    
`

export default I;