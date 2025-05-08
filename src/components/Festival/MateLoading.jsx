import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import coralCheck from '/assets/Matching/big-check.svg';
import blackCheck from '/assets/Matching/info.svg';

import '/src/styles/Festival/MateLoading.css';

const MateLoading = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state || {};
    const [confettiItems, setConfettiItems] = useState([]);
    return (
        <div className="mate-loading-container">
            <div className="mate-loading-top">
            </div>

            <div className="mate-loading-middle">
            </div>

            <div className="mate-loading-bottom">
            </div>
        </div>
    );
};

export default MateLoading;