import styled from "styled-components";

const M = {};
M.HeaderDiv=styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 16px;
    align-items: center;
    height: 26px;
`
M.ParticipateDiv =styled.div`
    padding: 0 16px;
    font-size: 18px;
    font-weight: 700;
    line-height: 140%;
    color: #000;
    margin-top: 23px;
`
M.ProgressMenu = styled.div`
    display: flex;
    width: 100%;
`
M.ProgressDiv = styled.div`
    flex: 1;
    height: 41px;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 15px;
    font-weight: 700;
    color: #000;
    line-height: 140%;
    border-bottom:${(props)=>props.active ? "2px solid #000": "1px solid #e6e6eb"};
`

M.MainDiv=styled.div`
    display: flex;
    flex-direction:column;
    padding: 13px 16px;
    flex: 1;
`
M.TotalFestivalDiv=styled.div`
    font-size: 13px;
    font-weight: 600;
    line-height: 140%;
    color: #3a3c42;
    margin-bottom: 53px;
`
M.ProgressNoFestivalDiv=styled.div`
    font-size:15px;
    color: #999aab;
    font-weight: 600;
    text-align: center;
`
M.PlusImg = styled.img`
    width: 57px;
    height: 57px;
    cursor: pointer;
    position: absolute;
    bottom: calc(11px + env(safe-area-inset-bottom));
    right: 13px;
`
M.MainWrapper = styled.div`
  display: flex;
`;  
export default M;