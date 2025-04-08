import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const BACKEND_URL = 'https://api.festimate.kr';
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = 'http://localhost:5173/v1/auth/login'
  const [isRequested, setIsRequested] = useState(false); // 중복 요청 방지

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    if (code && !isRequested) {
      console.log('Requesting access_token from Kakao with code:', code);
      setIsRequested(true); // 요청 시작
      axios
        .post(`https://kauth.kakao.com/oauth/token`, 
          `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&code=${code}`, {
          headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then((kakaoResponse) => {
          const { access_token } = kakaoResponse.data;
          console.log('Received access_token:', access_token);

          // 백엔드로 access_token 보내기
          axios
            .post(`${BACKEND_URL}/v1/auth/login`, null, {
              headers: {
                'Authorization': access_token,
              },
            })
            .then((backendResponse) => {
              console.log("백엔드 응답",backendResponse.data.data)
              const  token  = backendResponse.data.data.accessToken; // JWT 토큰
              console.log("jwtToken",token);
              localStorage.setItem('jwtToken', token);
              navigate('/info');
            })
            .catch((error) => {
              console.error('Backend error:', error.response?.data);
              navigate('/');
            });
        })
        .catch((error) => {
          console.error('Kakao error:', error.response?.data);
          navigate('/');
        });
    }
  }, [location.search]);
  return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;