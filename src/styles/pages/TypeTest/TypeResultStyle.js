import styled from "styled-components";

const R = {};
R.MainWrapper = styled.div`
    background-color: #f3f3f6;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100dvh;
`
R.BodyWrapper = styled.div`
    padding: 0 27px;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 50%;
    left: 50%;
    width: 100%;
`
R.HeaderDiv = styled.div`
    width: 100%;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 600;
    color: #000;
    margin-bottom: 30px;
    padding: 0 16px;
    margin-top: 12px;
`
R.Left = styled.div`
    flex: 1;
`;

R.Center = styled.div`
    flex: 1;
    text-align: center;
`;



R.DownLoadImg = styled.div`
    display: flex;
    justify-content: end;
    cursor: pointer;
`
R.Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: end ;
`
R.CardImg = styled.img`
    width: 100%;
    max-width: 430px;
    height: auto;
    object-fit: contain;
`
R.InstagramShare = styled.div`
    margin-top:26px ;
    box-sizing: border-box;
    width: 152px;
    height: 38px;
    border-radius: 20px;
    border: 1px solid #d5d5de;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: #3a4c42;
    gap: 3px;
    cursor: pointer;
`
R.GoToInputButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    height: 61px;
    background-color:#FF6F61;
    font-size: 15px;
    line-height: 140%;
    font-weight: 600;
    color: #fff;
    position: fixed;
    bottom: 0;
    max-width:430px ;
`
R.DivWrapper =styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 9px 16px 0px 16px;
    margin: 1.11vh 0px 3.94vh 0px;
`
R.TitleText= styled.div`
    font-size: 18px;
    line-height: 140%;
    font-weight: 700;
    color: #000;
    text-align: start;
    margin-bottom: 1.48vh;
`
R.RedSpan= styled.span`
    color: #ff6f61;
`
R.CheckDiv = styled.div`
    height: 30px;
    display: flex;
    gap: 5px;
    color: #999aab;
    font-size: 11px;
    font-weight: 500;
    line-height: 140%;
    text-align: start;
    margin-bottom: 2.83vh;
`
R.CheckedContainer = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`
R.InputDiv = styled.div`
    width: 100%;
    height: 136px;
    border: 1px solid #e6e6eb;
    border-radius: 9px;
    background-color: #fff;
    padding: 13px 11px 0px 11px;
    display: flex;
    flex-direction: column;
    gap: 4px;
`
R.InputBox = styled.textarea`
    padding-top: 0;
    all: unset;
    text-align: start;
    font-weight: 600;
    font-size: 13px;
    line-height:140%;
    color: #000;
    width: 100%;
    height: 95px;
    font-family: 'Pretendard', sans-serif; 
    &::placeholder{
        font-weight: 600;
        color: #d5d5de;
        font-family: 'Pretendard', sans-serif; 
    }
`
R.TypingText = styled.div`
    width: 100%;
    font-size: 11px;
    font-weight: 600;
    color: #7b7c87;
    line-height: 140%;
    text-align: end;
`
R.PleaseReadDiv = styled.div`
    width: 100%;
    height: 117px;
    background-color: #f3f3f6;
    color: #7b7c87;
    font-size: 13px;
    font-weight: 500;
    line-height: 140%;
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 17px 16px 0px 16px;
    text-align: start;

`
R.TitleSpan = styled.span`
    color: #3a3c42;
    font-size: 15px;
    font-weight: 600;
    line-height: 140%;
`
export default R;