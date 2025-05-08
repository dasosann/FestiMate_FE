import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '/src/styles/MyPage/MyProfile.css';
import defaultProfile from '/assets/MyPage/default-profile.svg';
import contactImg from '/assets/MyPage/contact.svg';
import edit from '/assets/MyPage/edit.svg';
import messageImg from '/assets/MyPage/message.svg';
import card from '/assets/MyPage/card_festival_type.svg';
import insta from '/assets/MyPage/insta.svg';
import download from '/assets/MyPage/download-btn.svg';
import instance from '../../../axiosConfig';
import male from '/assets/Festival/male.svg';
import female from '/assets/Festival/female.svg';

import newCard from '/assets/Card/new-card.svg';
import healCard from '/assets/Card/healing-card.svg';
import inssaCard from '/assets/Card/inssa-card.svg';
import planCard from '/assets/Card/plan-card.svg';
import shotCard from '/assets/Card/shot-card.svg';

const MyProfile = ({festivalId}) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [gender, setGender] = useState('male');
    const [name, setName] = useState('');
    const [attribute, setAttribute] = useState([]);
    const [contact, setContact] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const faceMap = {
        'DOG': "강아지상",
        'CAT': "고양이상",
        'BEAR': "곰상",
        'BUNNY': "토끼상",
        'FOX': "여우상",
        'DINOSAUR': "공룡상"
    };
    const CardMap = {
        'NEWBIE': newCard,
        'HEALING': healCard,
        'INFLUENCER': inssaCard,
        'PLANNER': planCard,
        'PHOTO': shotCard
    };

    const handleInstagramShare = async () => {
        try {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = CardMap[type];
    
            img.onload = async () => {
                const padding = 20;
                const canvasWidth = img.width + 2 * padding;
                const canvasHeight = img.height + 2 * padding;
    
                const canvas = document.createElement('canvas');
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                const ctx = canvas.getContext('2d');
    
                ctx.fillStyle = '#f3f3f6';
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(img, padding, padding);
    
                canvas.toBlob(async (blob) => {
                    if (!blob) {
                        console.error('Blob 생성 실패');
                        return;
                    }
                    const file = new File([blob], 'shared-image.png', { type: blob.type });
    
                    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                        try {
                            await navigator.share({
                                files: [file],
                                title: '내 페스티메이트 결과',
                                text: '내 매칭 타입 결과를 확인해보세요!',
                            });
                            console.log('공유 성공');
                        } catch (error) {
                            console.error('공유 실패:', error);
                        }
                    } else {
                        alert('이 기능은 해당 브라우저에서 지원되지 않습니다.');
                    }
                });
            };
    
            img.onerror = (error) => {
                console.error('이미지 로드 실패:', error);
            };
        } catch (error) {
            console.error('이미지 공유 중 오류 발생:', error);
        }
    };

    const handleDownload = async () => {
        try {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = CardMap[type];
            
            img.onload = async () => {
                // 패딩 없이 이미지 원본 크기 그대로 사용
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                
                // 배경 없이 이미지만 그리기
                ctx.drawImage(img, 0, 0);
                
                // 이미지를 데이터 URL로 변환 (PNG는 투명도 지원)
                const dataUrl = canvas.toDataURL('image/png');
                
                // 다운로드 링크 생성
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = '페스티메이트_카드.png';
                
                // 링크를 클릭하여 다운로드 시작
                document.body.appendChild(link);
                link.click();
                
                // 링크 요소 제거
                setTimeout(() => {
                    document.body.removeChild(link);
                    URL.revokeObjectURL(dataUrl);
                    console.log('카드 이미지 다운로드 완료');
                }, 100);
            };
            
            img.onerror = (error) => {
                console.error('이미지 로드 실패:', error);
                alert('카드 이미지를 불러오는 데 실패했습니다.');
            };
        } catch (error) {
            console.error('카드 이미지 다운로드 중 오류 발생:', error);
            alert('카드 이미지 다운로드 중 오류가 발생했습니다.');
        }
    };

    // 수정 페이지에서 돌아왔을 때 state에 edited가 있다면 토스트 메시지 표시
    useEffect(() => {
        if (location.state?.edited) {
            if(location.state.what == 'message')
                setToastMessage("메시지가 정상적으로 수정되었습니다.");
            else
                setToastMessage("연락 정보가 정상적으로 수정되었습니다.");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
            window.history.replaceState({}, '');
        }
        else if(location.state?.edited === false){
            if(location.state.what == 'message')
                setToastMessage("메시지 수정에 실패했습니다.");
            else
                setToastMessage("연락 정보 수정에 실패했습니다.");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
            window.history.replaceState({}, '');
        }
    }, [location.state]);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const result = await instance.get(`/v1/festivals/${festivalId}/participants/me/type`);
                const tmp = result.data.data;
                setGender(tmp.gender);
                setName(tmp.nickname);
                setAttribute([tmp.birthYear.toString().slice(2, 4)+"년생", tmp.mbti, faceMap[tmp.appearanceType]])
                setContact(tmp.introduction);
                setMessage(tmp.message);
                setType(tmp.typeResult);
                console.log(result);
            } catch (error) {
                console.error("[Nickname API Error] GET /v1/users/me/nickname:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
            }
        }
        getInfo();
    }, [location.state]);

    return (
        <div className="profile-section-container">
            <div className="profile-top-container">
                <div className="profile-profile-box">
                    <div className="profile-name-box">
                        {name}
                    </div>
                    <img src={gender === 'MAN' ? male : female} />
                </div>
                <div className="profile-about-box">
                    {attribute.map((data, index) => (
                        <div className="about-me" key={index}>
                            {`#${data}`}
                        </div>
                    ))}
                </div>
            </div>

            <div className="divide-line"></div>
            
            <div className="profile-message-box">
                <div className="profile-text-container">
                    <div className="meta-box">
                        <img src={contactImg} alt="연락정보" />
                        연락 정보
                        <img src={edit} alt="수정" onClick={() => navigate('../editContact', { state: { from: 'MyProfile', contactData: contact, messageData: message } })} />
                    </div>
                    <div className="profile-text-box">
                        {contact}
                    </div>
                </div>
                <div className="profile-text-container">
                    <div className="meta-box">
                        <img src={messageImg} alt="메시지" />
                        상대에게 전달할 메시지
                        <img src={edit} alt="수정" onClick={() => navigate('../editMessage', { state: { from: 'MyProfile', messageData: message, contactData: contact } })} />
                    </div>
                    <div className="profile-text-box">
                        {message}
                    </div>
                </div>
            </div>

            <div className="divide-line"></div>

            <div className="profile-card-container">
                <img src={CardMap[type]} className="profile-card" alt="카드" />
            </div>
            <div className="profile-btn-container">
                <div className="insta-share">
                    <button className="insta-btn" onClick={handleInstagramShare}>
                        <img src={insta} alt="인스타" />
                        인스타로 공유하기
                    </button>
                </div>
                <div className="insta-share">
                    <button className="insta-btn" onClick={handleDownload}>
                        <img src={download} alt="다운로드" />
                        이미지로 저장하기
                    </button>
                </div>                                              
            </div>

            {/* 토스트 메시지 */}
            {showToast && (
                <div className="toast-message">
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

export default MyProfile;
``
