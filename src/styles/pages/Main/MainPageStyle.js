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
    text-align: left;
`
M.ProgressMenu = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: ${({$isProgress})=>$isProgress ? '2.83vh' : '0'};
`
M.ProgressDiv = styled.div`
    flex: 1;
    height: 41px;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 15px;
    font-weight: ${({$isActive})=>$isActive ? "700": "600"};
    color: ${({$isActive})=>$isActive ? "#000": "#d5d5de"};
    line-height: 140%;
    border-bottom:${({$isActive})=>$isActive ? "2px solid #000": "1px solid #e6e6eb"};
`

M.MainDiv=styled.div`
    display: flex;
    flex-direction:column;
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
    /* margin-top: auto;
    margin-left: auto; */
    position: fixed;
    bottom: 45px;
    right: 16px;

`
M.MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 117px);
  padding: 0px 16px;
  padding-bottom: calc(45px + env(safe-area-inset-bottom, constant(safe-area-inset-bottom)));

  /* padding-bottom: calc(45px + var(--safe-bottom)); */
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  } 
  
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
  transform: translateX(${({$isOpen}) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
`;


/* 사용자 이름 */
M.DrawerUserName = styled.span`
  margin-top: 17px;
  font-size: 15px;
  font-weight: 700;
  color: #3a3c42;
  margin-bottom: 3.45vh;
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
  display: ${({$isOpen}) => ($isOpen ? 'block' : 'none')};
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
M.ComponentWrapper = styled.div`
  width: 100%;
  height: 75px;
  border-radius: 7px;
  border: 1px solid #e6e6eb;
  display: flex;
  padding: 11px 10px;
  background-color: #f3f3f6;
  gap: 10px;
  align-items: center;
`
M.TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
`
M.TitleText = styled.div`
  color: #000;
  font-size: 15px;
  font-weight: 600;
  line-height: 140%;
`
M.SubText = styled.div`
  color: #7b7c87;
  font-size: 11px;
  font-weight: 500;
  line-height: 140%;
` 
M.ArrowImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: auto;
`

M.EndFestivalNotice = styled.div`
  width: 100%;
  height:42px;
  background-color: #ffe6e4;
  display: flex;
  gap: 4px;
  padding: 0 16px;
  align-items: center;
`
M.FullWidthNoticeWrapper = styled.div`
  margin-left: -16px;
  margin-right: -16px;
`;
M.NoticeSpan = styled.span`
  font-size: 11px;
  line-height: 140%;
  font-weight: 600;
  color: #ff6f61;
`
M.MenuComponent = styled.div`
  width: 100%;
  height: 46px;
  font-size:13px ;
  color: #3a3c42;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding: 14px 0px;
  justify-content: space-between;
`

export default M;