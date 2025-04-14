import React, { useState } from 'react';
import '/src/styles/InfoPage/InfoPage.css';
import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';
import Navbar from './Navbar';
import { useMutation } from '@tanstack/react-query';
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

    // React Query 뮤테이션
    const submitMutation = useMutation({
        mutationFn: async (data) => {
            const response = await instance.post('/v1/users/signup', data);
            return response.data;
        },
        onSuccess: (data) => {
            console.log("데이터 전송 성공:", data);
            alert("정보가 성공적으로 제출되었습니다!");
            navigate('/mainpage');
        },
        onError: (error) => {
            console.error("데이터 전송 실패:", error.response?.data || error.message);
            console.log("에러 상세:", error.response?.data);
        }
    });

    // 데이터 전송 함수
    const submitData = (mbtiFromThird, animalFromThird) => {
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

        const data = {
            name,
            phoneNumber: phone,
            nickName: nickname,
            birthYear: parseInt(year, 10) || null,
            gender: gender ? gender.toUpperCase() : null,
            mbti: mbtiFromThird,
            appearanceType: animalFromThird ? animalFromThird.toUpperCase() : null,
            platform: "KAKAO"
        };  
        console.log("보내는 데이터", data);
        submitMutation.mutate(data);
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
                />
            )}
            {currentPage === 3 && (
                <ThirdSection
                    setCurrentPage={setCurrentPage}
                    submitData={submitData}
                    isLoading={submitMutation.isLoading}
                    setMbti={setMbti}
                />
            )}
        </div>
    );
};

export default InfoPage;