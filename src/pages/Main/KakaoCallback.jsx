import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const BACKEND_URL = 'https://api.festimate.kr'; // 백엔드 URL

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code'); // 쿼리에서 code 추출

    if (code) {
      console.log('Received code:', code);
      // 백엔드로 code 전송
      axios
        .post(`${BACKEND_URL}/v1/auth/login`, null,{
            headers:{
                'Authorization' : code,
            }
        })
        .then((response) => {
          const { token } = response.data; // 백엔드에서 JWT 토큰 반환 가정
          localStorage.setItem('jwtToken', token); // 토큰 저장
          navigate('/info'); // 성공 시 이동
        })
        .catch((error) => {
          console.error('백엔드 요청 실패:', error);
        });
    }
  }, [location, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;