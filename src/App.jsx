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
<<<<<<< HEAD
import TypeTest from './pages/TypeTest/TypeTest';
=======
import MainInfo from './components/MyPage/MainInfo';
>>>>>>> d08e18c49eed62e88638c2e1fd6e1e57fd7c9edc

function setScreenSize() {
  const vh = window.innerHeight * 0.009;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

const App = () => {
  // useEffect(() => {
  //   setScreenSize();
  // });

  return (
    <div>
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
            <Route path="/mypage/*" element={<MainInfo />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;
