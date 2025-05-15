import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoadingView from '../../components/LoadingView';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URL;
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    console.log('KakaoCallback Mounted:', {
      location: location.search,
      BACKEND_URL,
      REST_API_KEY,
      REDIRECT_URI
    });

    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    if (!code) {
      console.error('No code parameter in URL');
      navigate('/', { replace: true });
      return;
    }

    if (code && !isRequested) {
      console.log('Initiating Kakao OAuth with:', { code, REST_API_KEY, REDIRECT_URI });
      setIsRequested(true);

      const encodedRedirectUri = encodeURIComponent(REDIRECT_URI);
      const requestData = `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${encodedRedirectUri}&code=${code}`;
      console.log('Kakao OAuth Request Data:', requestData);

      axios
        .post(
          `https://kauth.kakao.com/oauth/token`,
          requestData,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        .then((kakaoResponse) => {
          console.log('Kakao OAuth Response:', kakaoResponse.data);
          const { access_token } = kakaoResponse.data;
          console.log('Received Kakao access_token:', access_token);

          axios
            .post(`${BACKEND_URL}/v1/auth/login`, null, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
              },
            })
            .then((backendResponse) => {
              console.log('Backend Login Response:', backendResponse.data);
              const { accessToken, refreshToken, userId } = backendResponse.data.data;

              // Store tokens
              localStorage.setItem('jwtToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);
              console.log('Stored Tokens:', {
                jwtToken: localStorage.getItem('jwtToken'),
                refreshToken: localStorage.getItem('refreshToken'),
                userId
              });

              // Redirect based on userId
              navigate(userId === null ? '/info' : '/mainpage', { replace: true });
            })
            .catch((error) => {
              console.error('[Login API Error] POST /v1/auth/login:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                headers: error.response?.headers
              });
              navigate('/', { replace: true });
            });
        })
        .catch((error) => {
          console.error('[Kakao OAuth API Error] POST kauth.kakao.com/oauth/token:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
          });
          navigate('/', { replace: true });
        });
    }
  }, [location.search, navigate, REST_API_KEY, REDIRECT_URI, BACKEND_URL, isRequested]);

  return <LoadingView />;
};

export default KakaoCallback;