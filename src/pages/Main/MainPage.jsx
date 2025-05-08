import React, { useEffect, useState } from 'react';
import M from '../../styles/pages/Main/MainPageStyle';
import { useNavigate } from 'react-router-dom';
import instance from '../../../axiosConfig';

// 컬러 이미지 매핑 객체
const colorCategoryImages = {
  MUSIC: '/assets/Main/music-category.svg',
  SCHOOL: '/assets/Main/school-category.svg',
  LIFE: '/assets/Main/life-category.svg',
  DEFAULT: '/assets/Main/school-category.svg',
};

// 흑백 이미지 매핑 객체
const grayscaleCategoryImages = {
  MUSIC: '/assets/Main/gray-music-logo.svg',
  SCHOOL: '/assets/Main/gray-school-logo.svg',
  LIFE: '/assets/Main/gray-life-logo.svg',
  DEFAULT: '/assets/Main/gray-school-logo.svg',
};

const ParticipateFestivalComponent = ({ category, title, startDate, endDate, selectedProgressMenu, festivalId }) => {
  const navigate = useNavigate();

  // endDate가 현재 날짜로부터 7일 이내인지 확인 (종료 상태에서만 적용)
  const isWithin7Days = selectedProgressMenu === '종료' ? (() => {
    try {
      // endDate 형식 (2025.04.30)을 2025-04-30으로 변환
      const formattedEndDate = endDate.replace(/\./g, '-');
      const end = new Date(formattedEndDate);
      const now = new Date();
      const diffMs = now - end;
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000; // 7일 (ms)
      console.log(`Festival ${title}: endDate=${endDate}, formatted=${formattedEndDate}, diffMs=${diffMs}, within7Days=${diffMs <= sevenDaysMs}`);
      return diffMs <= sevenDaysMs;
    } catch (error) {
      console.error(`Invalid endDate for festival ${title}: ${endDate}`, error);
      return false; // 날짜 파싱 실패 시 접근 불가
    }
  })() : true; // 진행 중일 때는 항상 접근 가능

  // 이미지 선택: 진행 중이거나 종료 7일 이내는 컬러, 종료 7일 초과는 그레이스케일
  const imageMap = (selectedProgressMenu === '진행' || isWithin7Days) ? colorCategoryImages : grayscaleCategoryImages;
  const imageSrc = imageMap[category] || imageMap.DEFAULT;

  if (!imageMap[category]) {
    console.warn(`Unknown category: ${category}, using DEFAULT`);
  }

  const navigateToFestivalInfo = () => {
    if (isWithin7Days) {
      console.log(`Navigating to festival/${festivalId}`);
      navigate(`/festival/${festivalId}`);
    }
  };

  return (
    <M.ComponentWrapper onClick={isWithin7Days ? navigateToFestivalInfo : null} $isClickable={isWithin7Days}>
      <img
        src={imageSrc}
        alt="카테고리"
        onError={(e) => (e.target.src = colorCategoryImages.DEFAULT)}
      />
      <M.TextWrapper>
        <M.TitleText>{title}</M.TitleText>
        <div style={{ display: 'flex', gap: '4px' }}>
          <img src="/assets/Main/calendar.svg" alt="달력" />
          <M.SubText>{startDate} - {endDate}</M.SubText>
        </div>
      </M.TextWrapper>
      {isWithin7Days && <M.ArrowImg src="/assets/Main/right-arrow.svg" alt="상세보기" />}
    </M.ComponentWrapper>
  );
};

const MainPage = () => {
  const paddingBottom = window.innerHeight - document.documentElement.clientHeight;
  document.documentElement.style.setProperty('--safe-bottom', `${paddingBottom}px`);
  const [selectedProgressMenu, setSelectedProgressMenu] = useState('진행');
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const nicknameResponse = await instance.get('/v1/users/me/nickname');
        setNickname(nicknameResponse.data.data?.nickname || '');
      } catch (error) {
        console.error('[Nickname API Error] GET /v1/users/me/nickname:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }

      const status = selectedProgressMenu === '진행' ? 'PROGRESS' : 'END';
      try {
        const festivalResponse = await instance.get('v1/users/me/festivals', {
          params: { status },
        });
        console.log('축제 데이터', festivalResponse);
        setFestivals(festivalResponse.data.data);
      } catch (error) {
        console.error('[Festivals API Error] GET /v1/users/me/festivals:', {
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
      <M.HeaderDiv style={{marginTop:'12px'}}>
        <img src="/assets/Main/festimate-logo.svg" alt="로고" />
        <img src="/assets/Main/mainpage-menu.svg" alt="메뉴" onClick={() => setIsMenuOpen(true)} />
      </M.HeaderDiv>
      <M.ParticipateDiv>
        <span style={{ color: '#ff6f61' }}>{nickname || '사용자'}</span>
        <span>님의 </span>
        <div style={{ display: 'flex', alignItems: 'center', gap:'5px' }}>
          페스티벌 참여 현황
          <img src="/assets/Main/flag.svg" alt="깃발" style={{width:'24px',height:'24px',marginBottom:'7px'}} />
        </div>
      </M.ParticipateDiv>
      <M.ProgressMenu $isProgress={selectedProgressMenu === '진행'}>
        <M.ProgressDiv
          $isActive={selectedProgressMenu === '진행'}
          onClick={() => setSelectedProgressMenu('진행')}
        >
          진행
        </M.ProgressDiv>
        <M.ProgressDiv
          $isActive={selectedProgressMenu === '종료'}
          onClick={() => setSelectedProgressMenu('종료')}
        >
          종료    
        </M.ProgressDiv>
      </M.ProgressMenu>
      <M.MainWrapper>
        <M.MainDiv>
          {loading ? (
            <M.TotalFestivalDiv></M.TotalFestivalDiv>
          ) : festivals?.length === 0 ? (
            <div style={{ marginTop: '10.34vh' }}>
              <img src="/assets/Main/mainpage-background-logo.svg" alt="배경로고" />
              {selectedProgressMenu === '진행' ? (
                <M.ProgressNoFestivalDiv>아직 참여하고 있는 페스티벌이 없어요</M.ProgressNoFestivalDiv>
              ) : (
                <M.ProgressNoFestivalDiv>아직 종료된 페스티벌이 없어요</M.ProgressNoFestivalDiv>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {selectedProgressMenu === '종료' && (
                <M.FullWidthNoticeWrapper>
                  <M.EndFestivalNotice>
                    <img src="/assets/Main/notice-mainpage.svg" alt="공지" />
                    <M.NoticeSpan>종료된 페스티벌은 종료일 기준 7일동안 입장이 가능합니다.</M.NoticeSpan>
                  </M.EndFestivalNotice>
                </M.FullWidthNoticeWrapper>
              )}
              {festivals?.map((festival, i) => (
                <ParticipateFestivalComponent
                  key={i}
                  title={festival.title}
                  startDate={festival.startDate}
                  endDate={festival.endDate}
                  category={festival.category}
                  selectedProgressMenu={selectedProgressMenu}
                  festivalId={festival.festivalId}
                />
              ))}
            </div>
          )}
        </M.MainDiv>
        <M.PlusImg src="/assets/Main/plus-button.svg" alt="버튼" onClick={() => navigate('/festivalcode')} />
      </M.MainWrapper>
      {isMenuOpen && <M.Overlay onClick={() => setIsMenuOpen(false)} />}
      <M.SideDrawer $isOpen={isMenuOpen}>
        <M.CloseButton src="/assets/Main/close-button.svg" alt="닫기" onClick={() => setIsMenuOpen(false)} />
        <img src="/assets/Main/user-icon.svg" alt="사용자 아바타" style={{ width: '60px', height: '60px' }} />
        <M.DrawerUserName>{nickname || '사용자'}님</M.DrawerUserName>
        <M.MenuComponent onClick={() => window.open("https://psychedelic-perigee-94e.notion.site/1cbaebccb8e4813dae70e4535a18228c?pvs=4")}>
          <span >문의하기</span>
          <img src="/assets/Main/right-arrow.svg" alt="사용자 아바타" />
        </M.MenuComponent>
        <M.MenuComponent onClick={() => window.open("https://psychedelic-perigee-94e.notion.site/1cbaebccb8e481bcb46febaa6e5f80a5?pvs=4")}>
          <span >개인정보처리방침</span>
          <img src="/assets/Main/right-arrow.svg" alt="사용자 아바타" />
        </M.MenuComponent>
      </M.SideDrawer>
      {isLogoutModalOpen && <M.ModalOverlay onClick={() => setIsLogoutModalOpen(false)} />}
      <M.LogoutModal $isOpen={isLogoutModalOpen}>
        <M.LogoutConfirmP>로그아웃 하시겠습니까?</M.LogoutConfirmP>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <M.ConfirmLogoutButton
            $color="#7b7c87"
            $backgroundColor="#E6E6EB"
            onClick={() => setIsLogoutModalOpen(false)}
          >
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