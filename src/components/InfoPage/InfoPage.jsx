import React, { useState, useEffect } from 'react';
import '/src/styles/InfoPage/InfoPage.css';
import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import instance from '../../../axiosConfig';

const InfoPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState(null);
    const [year, setYear] = useState('');
    const [mbti, setMbti] = useState('');
    const [animal, setAnimal] = useState('');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 각 섹션별 유효성 상태 추가
    const [isFirstSectionValid, setIsFirstSectionValid] = useState(false);
    const [isSecondSectionValid, setIsSecondSectionValid] = useState(false);
    const [isThirdSectionValid, setIsThirdSectionValid] = useState(false);

    const [flag, setFlag] = useState(1);

    const [canPass, setCanPass] = useState(false);

    useEffect(() => {
        const check = async () => {
            try {
                const result = await instance.get('/v1/users/me/nickname');
                if(result.status==200) {
                    alert("이미 정보를 입력하셨습니다.");
                    navigate('/mainpage');
                }
                console.log(result);
            } catch (error) {
                
            }
        }
        check();
    }, []);

    // 데이터 전송 함수
    const submitData = async (mbtiFromThird, animalFromThird) => {
        // 유효성 검사
        if (!name || !phone || !nickname || !gender || !year || !mbtiFromThird || !animalFromThird) {
            console.log("유효성 검사 실패:", {
                name,
                phone,
                nickname,
                gender,
                year,
                mbti: mbtiFromThird,
                animal: animalFromThird
            });
            alert("모든 필수 정보를 입력해 주세요.");
            return;
        }

        // 상태 업데이트 (UI 반영용, 선택적)
        setMbti(mbtiFromThird);
        setAnimal(animalFromThird);
        setIsSubmitting(true);

        const data = {
            name: name,
            phoneNumber: phone,
            nickName: nickname,
            birthYear: parseInt(year, 10) || null,
            gender: gender ? gender.toUpperCase() : null,
            mbti: mbtiFromThird,
            appearanceType: animalFromThird ? animalFromThird.toUpperCase() : null,
            platform: "KAKAO"
        };  
        
        try {
            const response = await instance.post('/v1/users/signup', data);
            console.log("데이터 전송 성공:", response.data);
            if (response.data.code === 2010) {
                // 새로운 토큰 저장
                const { accessToken, refreshToken } = response.data.data;
                if (accessToken && refreshToken) {
                    localStorage.setItem('jwtToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    console.log('Updated jwtToken:', accessToken);
                    console.log('Updated refreshToken:', refreshToken);
                }

                alert("정보가 성공적으로 제출되었습니다!");
                navigate('/mainpage',{replace:true});
            }
        } catch (error) {
            console.error("데이터 전송 실패:", error.response?.data || error.message);
            console.log("에러 상세:", error.response?.data);
            alert("제출 중 오류가 발생했습니다. 다시 시도해 주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="section-container">
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {currentPage === 1 && (
                <FirstSection 
                    setCurrentPage={setCurrentPage}
                    setPhone={setPhone}
                    setName={setName}
                    name={name}
                    phone={phone}
                    flag={flag}
                    setIsFirstSectionValid={setIsFirstSectionValid}
                    isFirstSectionValid={isFirstSectionValid}
                />
            )}
            {currentPage === 2 && (
                <SecondSection 
                    setCurrentPage={setCurrentPage}
                    nickname={nickname}
                    setNickname={setNickname}
                    gender={gender}
                    setGender={setGender}
                    year={year}
                    setYear={setYear}
                    flag={flag}
                    setIsSecondSectionValid={setIsSecondSectionValid}
                    isSecondSectionValid={isSecondSectionValid}
                    canPass={canPass}
                    setCanPass={setCanPass}
                />
            )}
            {currentPage === 3 && (
                <ThirdSection
                    setCurrentPage={setCurrentPage}
                    submitData={submitData}
                    isLoading={isSubmitting}
                    setMbti={setMbti}
                    flag={flag}
                    setIsThirdSectionValid={setIsThirdSectionValid}
                    isThirdSectionValid={isThirdSectionValid}
                />
            )}
        </div>
    );
};

export default InfoPage;