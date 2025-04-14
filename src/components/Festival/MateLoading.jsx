import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import blueConfetti from '/assets/Festival/blue-confetti.svg';
import dotConfetti from '/assets/Festival/dot-confetti.svg';
import dotConfetti2 from '/assets/Festival/dot-confetti2.svg';
import redConfetti from '/assets/Festival/red-confetti.svg';
import redConfetti2 from '/assets/Festival/red-confetti2.svg';
import yellowConfetti from '/assets/Festival/yellow-confetti.svg';

import '/src/styles/Festival/MateLoading.css';

const MateLoading = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state || {};
    const [confettiItems, setConfettiItems] = useState([]);
    
    // Define the specific confetti counts
    const confettiConfig = [
        { image: yellowConfetti, count: 1 },
        { image: dotConfetti, count: 2 },
        { image: dotConfetti2, count: 1 },
        { image: redConfetti, count: 2 },
        { image: redConfetti2, count: 1 },
        { image: blueConfetti, count: 1 }
    ];
    
    useEffect(() => {
        // Generate random confetti positions on component mount
        const newConfetti = [];
        let idCounter = 0;
        
        // Create the exact number of each confetti type
        confettiConfig.forEach(({ image, count }) => {
            for (let i = 0; i < count; i++) {
                const randomTop = Math.random() * 50 + 15; // 15% to 65% from top
                const randomLeft = Math.random() * 70 + 15; // 15% to 85% from left
                const randomDelay = Math.random() * 0.3; // 0 to 0.3s delay
                const randomRotation = Math.random() * 360; // 0 to 360 degree rotation
                
                newConfetti.push({
                    id: idCounter++,
                    image: image,
                    style: {
                        top: `${randomTop}%`,
                        left: `${randomLeft}%`,
                        animationDelay: `${randomDelay}s`,
                        transform: `rotate(${randomRotation}deg)`
                    }
                });
            }
        });
        
        setConfettiItems(newConfetti);
    }, []);

    return (
        <div className="mate-loading-container">
            {/* Confetti elements */}
            <div className="confetti-container">
                {confettiItems.map((confetti) => (
                    <img 
                        key={confetti.id}
                        src={confetti.image} 
                        alt="Confetti" 
                        className="confetti"
                        style={confetti.style}
                    />
                ))}
            </div>
            
            <div className="mate-loading-box">
                <div className="mate-loading-text">
                    {name}님의<br/>
                    취향에 맞는<br/>
                    페스티메이트를 찾고 있어요!<br/>
                    <br/>
                    매칭이 완료되면<br/>
                    홈화면에서 결과를 확인할 수 있어요!
                </div>
                <button className="mate-loading-btn" onClick={() => navigate(-1)}>
                    결과화면 보러가기
                </button>
            </div>
        </div>
    );
};

export default MateLoading;