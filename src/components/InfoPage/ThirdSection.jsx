import React, { useState } from 'react';
import '/src/styles/InfoPage/ThirdSection.css';
import check from '/assets/InfoPage/check-coral.svg';
import bear from '/assets/InfoPage/ic_bear.svg';
import bunny from '/assets/InfoPage/ic_bunny.svg';
import cat from '/assets/InfoPage/ic_cat.svg';
import dog from '/assets/InfoPage/ic_dog.svg';
import fox from '/assets/InfoPage/ic_fox.svg';
import dinosaur from '/assets/InfoPage/ic_dinosaur.svg';

const ThirdSection = ({ setCurrentPage, submitData, isLoading }) => {
    const [EI, setEI] = useState('');
    const [NS, setNS] = useState('');
    const [FT, setFT] = useState('');
    const [PJ, setPJ] = useState('');
    const [localAnimal, setLocalAnimal] = useState('');
    const isFilled = EI && NS && FT && PJ && localAnimal;

    const handleSubmit = () => {
        if (isFilled) {
            const MBTI = `${EI}${NS}${FT}${PJ}`; // 예: "ENTP"
            // 상태 업데이트 (UI 반영용)
            submitData(MBTI, localAnimal);
        } else {
            alert("MBTI와 얼굴상을 모두 선택해 주세요.");
        }
    };

    return (
        <div className="info-container">
            <div className="info-phrase">
                매칭에 사용될 <span className="point-color">나의 정보</span>를 입력해주세요!
            </div>
            <div className="info-explain">
                <img src={check} alt="check" />
                매칭 시 상대방에게 제공되는 정보입니다.
            </div>
            <div className="info-explain">
                <img src={check} alt="check" />
                <div>
                    얼굴상은 매칭에 직접적인 영향을 미치지 않으며,
                    <br />
                    재미 요소로 참고해주세요!
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
                        <label className='face-option'>
                            <button
                                className={`face-box ${localAnimal === 'dog' ? 'selected' : ''}`}
                                onClick={() => setLocalAnimal('dog')}
                            >
                                <img src={dog} alt="강아지상" />
                                강아지상
                            </button>
                            <button
                                className={`face-box ${localAnimal === 'cat' ? 'selected' : ''}`}
                                onClick={() => setLocalAnimal('cat')}
                            >
                                <img src={cat} alt="고양이상" />
                                고양이상
                            </button>
                            <button
                                className={`face-box ${localAnimal === 'bear' ? 'selected' : ''}`}
                                onClick={() => setLocalAnimal('bear')}
                            >
                                <img src={bear} alt="곰상" />
                                곰상
                            </button>
                            <button
                                className={`face-box ${localAnimal === 'bunny' ? 'selected' : ''}`}
                                onClick={() => setLocalAnimal('bunny')}
                            >
                                <img src={bunny} alt="토끼상" />
                                토끼상
                            </button>
                            <button
                                className={`face-box ${localAnimal === 'fox' ? 'selected' : ''}`}
                                onClick={() => setLocalAnimal('fox')}
                            >
                                <img src={fox} alt="여우상" />
                                여우상
                            </button>
                            <button
                                className={`face-box ${localAnimal === 'dinosaur' ? 'selected' : ''}`}
                                onClick={() => setLocalAnimal('dinosaur')}
                            >
                                <img src={dinosaur} alt="공룡상" />
                                공룡상
                            </button>
                        </label>
                    </div>
                </div>
                <button
                    className={`next-button ${isFilled ? 'active' : 'inactive'}`}
                    onClick={handleSubmit}
                    disabled={isLoading || !isFilled}
                >
                    {isLoading ? '제출 중...' : '완료'}
                </button>
            </div>
        </div>
    );
};

export default ThirdSection;