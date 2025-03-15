import React , { useEffect }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BeforeLogin from './components/Landing/Landing';
import './App.css'


/*휴대폰 접속시 상단바 길이 반영 , pc접속시 북마크 등 기타 길이 반영 */
function setScreenSize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

const App = () => {
  useEffect(() => { 
    setScreenSize();
    window.addEventListener("resize", setScreenSize);
    return () => window.removeEventListener("resize", setScreenSize);
  });

  return (
    <div className="page-container">
        <Router>
            <div className="content">
                <Routes>
                    <Route path="/" element={<BeforeLogin />} /> 
                </Routes>
            </div>
        </Router>
    </div>
  );
};

export default App;
