import React, { useEffect, useState } from 'react';
import M from '../../styles/pages/Main/MainPageStyle';
import { useNavigate } from 'react-router-dom';
import instance from '../../../axiosConfig';

const ParticipateFestivalComponent = ({ category, title, period }) => {
  return (
    <M.ComponentWrapper>
      <img src="/assets/Main/school-category.svg" alt="카테고리" />
      <M.TextWrapper>
        <M.TitleText>{title}</M.TitleText>
        <div style={{ display: 'flex', gap: '4px' }}>
          <img src="/assets/Main/calendar.svg" alt="달력" />
          <M.SubText>{period}</M.SubText>
        </div>
      </M.TextWrapper>
      <M.ArrowImg src="/assets/Main/right-arrow.svg" alt="상세보기" />
    </M.ComponentWrapper>
  );
};

const MainPage = () => {
  const paddingBottom = window.innerHeight - document.documentElement.clientHeight;
  document.documentElement.style.setProperty('--safe-bottom', `${paddingBottom}px`);
  const [selectedProgressMenu, setSelectedProgressMenu] = useState("진행");
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // 닉네임 가져오기
      try {
        const nicknameResponse = await instance.get('/v1/users/me/nickname');
        setNickname(nicknameResponse.data.data?.nickanme || ""); // 응답 구조 따라 조정
      } catch (error) {
        console.error("[Nickname API Error] GET /v1/users/me/nickname:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }

      // 페스티벌 데이터 가져오기
      const url = selectedProgressMenu === "진행"
        ? "/v1/users/me/festivals"
        : "/v1/festivals?status=finished";
      try {
        const festivalResponse = await instance.get(url);
        console.log("축제 데이터", festivalResponse);
        setFestivals(festivalResponse.data.data);
      } catch (error) {
        console.error("[Festivals API Error] GET /v1/festivals:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        setFestivals([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedProgressMenu]);

  return (
    <div style={{ height: 'auto', minHeight: '100dvh', textAlign: 'left' }}>
      <M.HeaderDiv>
        <img src="/assets/Main/festimate-logo.svg" alt="로고" />
        <img src="/assets/Main/mainpage-menu.svg" alt="메뉴" onClick={() => setIsMenuOpen(true)} />
      </M.HeaderDiv>
      <M.ParticipateDiv>
        <span style={{ color: '#ff6f61' }}>{nickname || "사용자"}</span>
        <span>님의 </span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          페스티벌 참여 현황
          <img src="/assets/Main/flag.svg" alt="깃발" />
        </div>
      </M.ParticipateDiv>
      <M.ProgressMenu>
        <M.ProgressDiv
          $isActive={selectedProgressMenu === "진행"}
          onClick={() => setSelectedProgressMenu("진행")}
        >
          진행
        </M.ProgressDiv>
        <M.ProgressDiv
          $isActive={selectedProgressMenu === "종료"}
          onClick={() => setSelectedProgressMenu("종료")}
        >
          종료
        </M.ProgressDiv>
      </M.ProgressMenu>
      <M.MainWrapper>
        <M.MainDiv>
          {loading ? (
            <M.TotalFestivalDiv>로딩중...</M.TotalFestivalDiv>
          ) : festivals.length === 0 ? (
            <div style={{ marginTop: '10.34vh' }}>
              <img src="/assets/Main/mainpage-background-logo.svg" alt="배경로고" />
              {selectedProgressMenu === "진행" ? (
                <M.ProgressNoFestivalDiv>아직 참여하고 있는 페스티벌이 없어요</M.ProgressNoFestivalDiv>
              ) : (
                <M.ProgressNoFestivalDiv>아직 종료된 페스티벌이 없어요</M.ProgressNoFestivalDiv>
              )}
            </div>
          ) : (
            <div>
              {selectedProgressMenu === "종료" && (
                <M.FullWidthNoticeWrapper>
                  <M.EndFestivalNotice>
                    <img src="/assets/Main/notice-mainpage.svg" alt="공지" />
                    <M.NoticeSpan>종료된 페스티벌은 종료일 기준 7일동안 입장이 가능합니다.</M.NoticeSpan>
                  </M.EndFestivalNotice>
                </M.FullWidthNoticeWrapper>
              )}
              {festivals.map((festival, i) => (
                <ParticipateFestivalComponent
                  key={i}
                  title={festival.title}
                  period={festival.period}
                  category={festival.category}
                />
              ))}
            </div>
          )}
        </M.MainDiv>
        <M.PlusImg src="/assets/Main/plus-button.svg" alt="버튼" onClick={() => navigate("/festivalcode")} />
      </M.MainWrapper>
      {isMenuOpen && <M.Overlay onClick={() => setIsMenuOpen(false)} />}
      <M.SideDrawer $isOpen={isMenuOpen}>
        <M.CloseButton src="/assets/Main/close-button.svg" alt="닫기" onClick={() => setIsMenuOpen(false)} />
        <img src="/assets/Main/user-icon.svg" alt="사용자 아바타" style={{ width: '60px', height: '60px' }} />
        <M.DrawerUserName>{nickname || "사용자"}님</M.DrawerUserName>
        <M.MenuComponent>
          <span>문의하기</span>
          <img src="/assets/Main/right-arrow.svg" alt="사용자 아바타" />
        </M.MenuComponent>
        <M.MenuComponent>
          <span>개인정보처리방침</span>
          <img src="/assets/Main/right-arrow.svg" alt="사용자 아바타" />
        </M.MenuComponent>
        {/* <M.DrawerBody>
          <M.LogoutBtn onClick={() => setIsLogoutModalOpen(true)}>로그아웃</M.LogoutBtn>
        </M.DrawerBody> */}
      </M.SideDrawer>
      {isLogoutModalOpen && <M.ModalOverlay onClick={() => setIsLogoutModalOpen(false)} />}
      <M.LogoutModal $isOpen={isLogoutModalOpen}>
        <M.LogoutConfirmP>로그아웃 하시겠습니까?</M.LogoutConfirmP>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <M.ConfirmLogoutButton $color="#7b7c87" $backgroundColor="#E6E6EB" onClick={() => setIsLogoutModalOpen(false)}>
            취소
          </M.ConfirmLogoutButton>
          <M.ConfirmLogoutButton $color="#fff" $backgroundColor="#3a3c42">
            확인
          </M.ConfirmLogoutButton>
        </div>
      </M.LogoutModal>
    </div>
  );
};

export default MainPage;