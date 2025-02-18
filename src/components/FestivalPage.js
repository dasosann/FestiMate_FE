import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FestivalPage.css';
import logo from '../assets/festimatelogo.png';

const FestivalPage = () => {
    const navigate = useNavigate();
    const [inviteCode, setInviteCode] = useState('');
  
    const handleLogin = () => {
      navigate('/info');
    };

    const handleNext = () => {
        //TODO 백으로 코드 던져서 검증 추가
        if (inviteCode) {
          console.log('다음 페이지로 이동');
          navigate('/info');
        }
      };
  
    return (
    <div className="festival-container">
        <img src={logo} alt="FestiMate Logo" className="logo" />
        <div className="invite-group">
            <div className="label-wrapper">
                <label className="input-label">
                    <b>초대코드</b>
                </label>
            </div>
            <input
                type="text"
                className="input-field"
                placeholder="초대코드를 입력해주세요"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
            />
            <button
            className={`next-btn ${inviteCode ? 'active' : ''}`} 
            onClick={handleNext}
            >
            다음
            </button>
        </div>

        <div className="room-group">
            <div className="label-wrapper">
                <label className="input-label">
                    <b>내가 참여하는 방</b>
                </label>
            </div>
            <div className="room-wrapper">
                <div className="room-field">1</div>
                <div className="room-field">2</div>
                <div className="room-field">3</div>
                <div className="room-field">4</div>
                <div className="room-field">5</div>
                <div className="room-field">6</div>
                <div className="room-field">7</div>
                <div className="room-field">8</div>
                <div className="room-field">9</div>
                <div className="room-field">10</div>
                <div className="room-field">11</div>
                <div className="room-field">12</div>
                <div className="room-field">13</div>
                <div className="room-field">14</div>
                <div className="room-field">15</div>
                <div className="room-field">16</div>
                <div className="room-field">17</div>
                <div className="room-field">18</div>
                <div className="room-field">19</div>
                <div className="room-field">20</div>
                <div className="room-field">21</div>
                <div className="room-field">22</div>
                <div className="room-field">23</div>
                <div className="room-field">24</div>

            </div>            
        </div>
    </div>
    );
  };
  
export default FestivalPage;