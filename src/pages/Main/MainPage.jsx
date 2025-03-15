import React, { useEffect, useState } from 'react';
import M from '../../styles/pages/Main/MainPageStyle';

const MainPage = () => {
  const [selectedProgressMenu, setSelectedProgressMenu] = useState("진행");
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFestivals = async () => {
      setLoading(true);
      let url = "";
      // 진행, 종료 상태에 따라 다른 API 호출
      if (selectedProgressMenu === "진행") {
        url = "https://your-backend-api.com/festivals?status=ongoing";
      } else {
        url = "https://your-backend-api.com/festivals?status=finished";
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("API 요청 실패");
        }
        const data = await response.json();
        setFestivals(data);
      } catch (error) {
        console.error("Error fetching festivals:", error);
        setFestivals([]);
      }
      setLoading(false);
    };

    fetchFestivals();
  }, [selectedProgressMenu]);

  return (
    <div style={{ height: '100vh', position:'relative' }}>
      <M.HeaderDiv>
        <img src="/assets/Main/festimate-logo.svg" alt="로고" />
        <img src="/assets/Main/mainpage-menu.svg" alt="메뉴" />
      </M.HeaderDiv>
      <M.ParticipateDiv>
        <span style={{ color: '#ff6f61' }}>가대 고윤정</span>
        <span>님의 </span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          페스티벌 참여 현황&nbsp;
          <img src="/assets/Main/flag.svg" alt="깃발" />
        </div>
      </M.ParticipateDiv>
      <M.ProgressMenu>
        <M.ProgressDiv
          active={selectedProgressMenu === "진행"}
          onClick={() => setSelectedProgressMenu("진행")}
        >
          진행
        </M.ProgressDiv>
        <M.ProgressDiv
          active={selectedProgressMenu === "종료"}
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
            <>
              <M.TotalFestivalDiv>총 0개</M.TotalFestivalDiv>
              <img src="/assets/Main/mainpage-background-logo.svg" alt="배경로고" />
              {selectedProgressMenu === "진행" ? (
                <M.ProgressNoFestivalDiv>아직 참여하고 있는 페스티벌이 없어요</M.ProgressNoFestivalDiv>
              ) : (
                <M.ProgressNoFestivalDiv>아직 종료된 페스티벌이 없어요</M.ProgressNoFestivalDiv>
              )}
            </>
          ) : (
            festivals.map((festival) => (
              <div key={festival.id}>
                <h3>{festival.name}</h3>
                <p>{festival.description}</p>
              </div>
            ))
          )}
        </M.MainDiv>
        <M.PlusImg src="/assets/Main/plus-button.svg" alt="버튼" />
      </M.MainWrapper>
    </div>
  );
};

export default MainPage;
