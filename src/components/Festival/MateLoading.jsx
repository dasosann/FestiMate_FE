import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import coralCheck from '/assets/Matching/big-check.svg';
import infoBtn from '/assets/Matching/info.svg';
import blankCircle from '/assets/Matching/blank-circle.svg';
import grayCircle from '/assets/Matching/gray-circle.svg';

import '/src/styles/Festival/MateLoading.css';

const MateLoading = () => {
    const navigate = useNavigate();
    const location = useLocation();
        const { name } = location.state || {};
        const [confettiItems, setConfettiItems] = useState([]);

    return (
        <div className="mate-loading-container">
            <div className="mate-loading-top">
                <img src={coralCheck} className="mate-loading-top-check"/>
                <div className="mate-loading-top-text">
                    <div className="mate-loading-top-text-title">
                        매칭 등록이 완료되었습니다.
                    </div>
                </div>
            </div>

            <div className="mate-loading-middle">
                <div className="mate-loading-middle-top">
                    <img src={infoBtn} />
                    취향에 맞는 페스티메이트를 찾고 있어요
                </div>
                <div className="mate-loading-middle-bottom">
                    매칭이 완료되면 홈화면에서 결과를 확인할 수 있어요<br/>
                    매칭 상황에 따라 시간이 걸릴 수 있어요
                </div>
            </div>

            <div className="mate-loading-bottom">
                <div className="bottom-step-group">
                    <div className="bottom-step">
                        <img src={coralCheck} className="bottom-circle"/>
                        <div className="bottom-step-connector active" style={{ width: 'calc(50% - 12.5px)', right: 0 }}></div>
                        <div className="bottom-label-1">매칭 등록</div>
                    </div>
                    <div className="bottom-step">
                        <img src={blankCircle} className="bottom-circle"/>
                        <div className="bottom-step-connector inactive" style={{ width: 'calc(50% - 12.5px)', right: 0 }}></div>
                        <div className="bottom-step-connector active" style={{ width: 'calc(50% - 12.5px)', left: 0 }}></div>
                        <div className="bottom-label-2">매칭중</div>
                    </div>
                    <div className="bottom-step">
                        <img src={grayCircle} className="bottom-circle"/>
                        <div className="bottom-step-connector inactive" style={{ width: 'calc(50% - 12.5px)', left: 0 }}></div>
                        <div className="bottom-label-3">매칭 완료</div>
                    </div>
                </div>
            </div>
            <button
                className={`mate-next-button`}
                onClick={() => navigate(-1)}
                >
                결과 보러가기
            </button>
        </div>
    );
};

export default MateLoading;