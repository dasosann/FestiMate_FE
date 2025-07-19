import React ,{ useEffect }from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import LoginPage from './components/LoginPage';
import InfoPage from './components/InfoPage/InfoPage';
import FestivalPage from './components/FestivalPage';
import MainPage from './pages/Main/MainPage';
import './App.css';
import InputCode from './pages/Main/InputCode';
import OpenExternalBrowser from '../OpenExternalBrowser';
import TypeTest from './pages/TypeTest/TypeTest';
import MainInfo from './components/MyPage/MainInfo';
import TypeResult from './pages/TypeTest/TypeResult';
import FestivalInfo from './components/Festival/FestivalInfo';
import UserInfo from './components/Festival/UserInfo';
import KakaoCallback from './pages/Main/KakaoCallback';
import MateLoading from './components/Festival/MateLoading';

function setScreenSize() {
  const vh = window.innerHeight * 0.009;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

const App = () => {
  // useEffect(() => {
  //   setScreenSize();
  // });

  return (
    <div translate="no" className="notranslate">
      <OpenExternalBrowser/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />  {/* 기본 경로 수정 ✅ */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/enterFestival" element={<FestivalPage />} />
            <Route path="/mainPage" element={<MainPage />} />
            <Route path="/festivalCode" element={<InputCode />} />
            <Route path="/festivalType" element={<TypeTest />} />
            <Route path="/typeresult" element={<TypeResult />} />
            <Route path="/festival/:festivalId" element={<FestivalInfo />} />
            <Route path="/festival/:festivalId/:matchingId" element={<UserInfo />} />
            <Route path="/festival/:festivalId/mypage/*" element={<MainInfo />} />
            <Route path="/v1/auth/login" element={<KakaoCallback/>} />
            <Route path="/mateLoading" element={<MateLoading />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;
