import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import instance from '../../../axiosConfig';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const BACKEND_URL = 'https://api.festimate.kr';
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = 'https://festi-mate-fe.vercel.app//v1/auth/login';
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    if (code && !isRequested) {
      console.log('Requesting access_token from Kakao with code:', code);
      setIsRequested(true);
      axios
        .post(
          `https://kauth.kakao.com/oauth/token`,
          `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&code=${code}`,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        .then((kakaoResponse) => {
          const { access_token } = kakaoResponse.data;
          console.log('Received access_token:', access_token);

          axios
            .post(`${BACKEND_URL}/v1/auth/login`,null, {
              headers: { 'Content-Type': 'application/json',
                'Authorization': access_token, 
               }
              ,
            })
            .then((backendResponse) => {
              console.log('백엔드 응답', backendResponse.data.data);
              const { accessToken, refreshToken } = backendResponse.data.data;
              localStorage.setItem('jwtToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);

              instance
                .get('/v1/users/me/nickname')
                .then((nicknameResponse) => {
                  console.log("가져온 닉네임" , nicknameResponse.data.data)
                  const nickname = nicknameResponse.data.data?.nickname;
                  console.log("저장한 닉네임", nickname)
                  navigate(nickname ? '/mainpage' : '/info');
                })
                .catch((error) => {
                  console.error('[Nickname API Error] GET /v1/users/me/nickname:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                  });
                  navigate('/info');
                });
            })
            .catch((error) => {
              console.error('[Login API Error] POST /v1/auth/login:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
              });
              navigate('/');
            });
        })
        .catch((error) => {
          console.error('[Kakao OAuth API Error] POST kauth.kakao.com/oauth/token:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
          navigate('/');
        });
    }
  }, [location.search, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;