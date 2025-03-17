import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '/src/styles/InfoPage/ThirdSection.css';
import check from '/assets/InfoPage/check-coral.svg';
import bear from '/assets/InfoPage/ic_bear.svg';
import bunny from '/assets/InfoPage/ic_bunny.svg';
import cat from '/assets/InfoPage/ic_cat.svg';
import dog from '/assets/InfoPage/ic_dog.svg';
import fox from '/assets/InfoPage/ic_fox.svg';
import dinosaur from '/assets/InfoPage/ic_dinosaur.svg';

const ThirdSection = ({setCurrentPage}) => {

    const [EI, setEI] = useState('');
    const [NS, setNS] = useState('');
    const [FT, setFT] = useState('');
    const [PJ, setPJ] = useState('');
    const [face, setFace] = useState('');
    const isFilled = EI && NS && FT && PJ && face

    const handleNext = () => {
        if (EI && NS && FT && PJ && face) {
            const MBTI = EI+NS+FT+PJ;
            console.log(face, MBTI);
            setCurrentPage(prev => prev);
        }
    };

    return (
        <div className="info-container">
            <div className="info-phrase">
                매칭에 사용될 <span className="point-color">나의 정보</span>를 입력해주세요!
            </div>
            <div className="info-explain"><img src={check} />매칭 시 상대방에게 제공되는 정보입니다.</div>
                <div className="info-explain">
                    <img src={check} />
                    <div>얼굴상은 매칭에 직접적인 영향을 미치지 않으며,
                        <br/>재미 요소로 참고해주세요!
                    </div>
                </div>
            <div className="content-container">
                <div className="info-input-container">
                    <div className="info-input-title">MBTI</div>
                    <div className="mbti-container">
                        <label className="mbti-option">
                            <button 
                                className={`mbti-box ${EI === 'E' ? 'selected' : ''}`}
                                onClick={() => setEI('E')}    
                            >
                                E
                            </button>
                        </label>
                        <label className="mbti-option">
                            <button 
                                className={`mbti-box ${EI === 'I' ? 'selected' : ''}`}
                                onClick={() => setEI('I')}
                            >
                                I
                            </button>
                        </label>
                    </div>
                    <div className="mbti-container">
                        <label className="mbti-option">
                            <button 
                                className={`mbti-box ${NS === 'N' ? 'selected' : ''}`}
                                onClick={() => setNS('N')}    
                            >
                                N
                            </button>
                        </label>
                        <label className="mbti-option">
                            <button 
                                className={`mbti-box ${NS === 'S' ? 'selected' : ''}`}
                                onClick={() => setNS('S')}
                            >
                                S
                            </button>
                        </label>
                    </div>
                    <div className="mbti-container">
                        <label className="mbti-option">
                            <button 
                                className={`mbti-box ${FT === 'F' ? 'selected' : ''}`}
                                onClick={() => setFT('F')}    
                            >
                                F
                            </button>
                        </label>
                        <label className="mbti-option">
                            <button 
                                className={`mbti-box ${FT === 'T' ? 'selected' : ''}`}
                                onClick={() => setFT('T')}
                            >
                                T
                            </button>
                        </label>
                    </div>
                    
                    <div className="mbti-container">
                        <label className="mbti-option">
                            <button 
                                className={`mbti-box ${PJ === 'P' ? 'selected' : ''}`}
                                onClick={() => setPJ('P')}    
                            >
                                P
                            </button>
                        </label>
                        <label className="mbti-option">
                            <button 
                                className={`mbti-box ${PJ === 'J' ? 'selected' : ''}`}
                                onClick={() => setPJ('J')}
                            >
                                J
                            </button>
                        </label>
                    </div>
                </div>
                <div className="info-input-container">
                    <div className="info-input-title">얼굴상</div>
                    <div className="face-container">
                        <label className="face-option">
                            <button 
                                className={`face-box ${face === 'dog' ? 'selected' : ''}`}
                                onClick={() => setFace('dog')}    
                            >
                                <img src={dog} />
                                강아지상
                            </button>
                            <button 
                                className={`face-box ${face === 'cat' ? 'selected' : ''}`}
                                onClick={() => setFace('cat')}    
                            >
                                <img src={cat} />
                                고양이상
                            </button>
                            <button 
                                className={`face-box ${face === 'bear' ? 'selected' : ''}`}
                                onClick={() => setFace('bear')}    
                            >
                                <img src={bear} />
                                곰상
                            </button>
                            <button 
                                className={`face-box ${face === 'bunny' ? 'selected' : ''}`}
                                onClick={() => setFace('bunny')}    
                            >
                                <img src={bunny} />
                                토끼상
                            </button>
                            <button 
                                className={`face-box ${face === 'fox' ? 'selected' : ''}`}
                                onClick={() => setFace('fox')}    
                            >
                                <img src={fox} />
                                여우상
                            </button>
                            <button 
                                className={`face-box ${face === 'dinosaur' ? 'selected' : ''}`}
                                onClick={() => setFace('dinosaur')}    
                            >
                                <img src={dinosaur} />
                                공룡상
                            </button>
                        </label>
                    </div>
                </div>
                    <button
                        className={`next-button ${isFilled ? 'active' : 'inactive'}`}
                        onClick={handleNext}
                    >
                        다음
                    </button>
            </div>
        </div>
    );
};

export default ThirdSection;
