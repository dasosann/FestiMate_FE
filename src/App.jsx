import React ,{ useEffect }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import LoginPage from './components/LoginPage';
import InfoPage from './components/InfoPage';
import FestivalPage from './components/FestivalPage';
import MainPage from './pages/Main/MainPage';

function setScreenSize() {
  const vh = window.innerHeight * 0.009;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

const App = () => {
  useEffect(() => {
    setScreenSize();
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />  {/* 기본 경로 수정 ✅ */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/enterFestival" element={<FestivalPage />} />
        <Route path="/mainPage" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
