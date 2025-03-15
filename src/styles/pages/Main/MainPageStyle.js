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
    bottom: calc(56px + env(safe-area-inset-bottom));
    right: 13px;
`
M.MainWrapper = styled.div`
  display: flex;
`;  
M.Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 999; 
`;
M.SideDrawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 65%;
  max-width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0,0,0,0.15);
  z-index: 1000;
  /* 초기 상태에서 화면 밖 (오른쪽) */
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 21px;
`;


/* 사용자 이름 */
M.DrawerUserName = styled.span`
  margin-top: 17px;
  font-size: 15px;
  font-weight: 700;
  color: #3a3c42;
`;

/* 닫기 버튼 */
M.CloseButton = styled.img`
  cursor: pointer;
  width: 14px;
  height: 14px;
  margin-left: auto;
  margin-bottom: 24px;
`;

/* 드로어 바디 영역 */
M.DrawerBody = styled.div`
  padding: 16px;
`;

/* 로그아웃 버튼 (예시) */
M.LogoutBtn = styled.button`
  all: unset;
  font-size: 13px;
  font-weight: 700;
  color: #3a3c42;
  cursor: pointer;
  position: absolute;
  bottom: 36px;
  transform: translateX(-50%);
  left: 50%;
`;
M.ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 1999; /* 사이드 메뉴보다 위에 오려면 더 큰 z-index */
`;
M.LogoutModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 305px;
  background: #fff;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
  z-index: 2000; /* 모달이 오버레이 위에 */
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  border-radius: 13px;
  text-align: center;
  padding: 0 11px;
  height: 128px;
`;
M.LogoutConfirmP = styled.p`
    margin: 25px 0 18px 0;
    color: #000;
    font-size: 18px;
    font-weight: 700;
`
M.ConfirmLogoutButton=styled.button`
    width: 138px;
    height: 47px;
    color: ${(props) => (props.color)};
    background-color: ${(props) => (props.backgroundColor)};
    border-radius: 7px;
    font-size: 15px;
    font-weight: 600;
    border: none;
`
export default M;