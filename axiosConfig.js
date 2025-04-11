import axios from "axios";

// Axios 기본 설정
const instance = axios.create({
  baseURL: "https://api.festimate.kr",
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("jwtToken");
    if (!accessToken) {
      window.location.href = "/";
      return Promise.reject(new Error("No access token found"));
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // 서버가 Bearer 요구 가정
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => {
    // 서버 응답 헤더에 새 토큰이 있으면 업데이트 (Bearer 없는 경우 처리)
    const newAccessToken = response.headers["authorization"];
    const newRefreshToken = response.headers["refresh-token"];
    
    if (newAccessToken) {
      // Bearer 접두사 없다고 가정, 그대로 저장
      localStorage.setItem("jwtToken", newAccessToken);
    }
    if (newRefreshToken) {
      localStorage.setItem("refreshToken", newRefreshToken);
    }

    return response;
  },
  async (error) => {
    if (!error.response) {
      console.error("Network error or server is down");
      alert("서버에 연결할 수 없습니다. 다시 시도해 주세요.");
      return Promise.reject(error);
    }

    const { config, response: { status, data } } = error;
    const originalRequest = config;

    // 액세스 토큰 만료 (401, SEC-001)
    if (status === 401 && data.code === "SEC-001") {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            "https://api.festimate.kr/v1/auth/refresh",
            null,
            { headers: { "Refresh-Token": refreshToken } }
          );

          const newAccessToken = refreshResponse.data.data.accessToken; // Bearer 없는 토큰 가정
          const newRefreshToken = refreshResponse.data.data.refreshToken; // 선택적

          localStorage.setItem("jwtToken", newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token error:", refreshError.response?.data);
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("refreshToken");
          alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
          window.location.href = "/";
          return Promise.reject(refreshError);
        }
      } else {
        localStorage.removeItem("jwtToken");
        alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
        window.location.href = "/";
      }
    }

    // 리프레시 토큰 만료 (401, SEC-002)
    if (status === 401 && data.code === "SEC-002") {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("refreshToken");
      alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
      window.location.href = "/";
    }

    // 기타 에러 처리
    if (status === 500) {
      console.error("Server error:", data);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } else if (status === 403) {
      console.error("권한 오류:", data);
      alert("해당 작업에 대한 권한이 없습니다.");
    } else if (status === 404) {
      console.error("요청한 자원을 찾을 수 없음:", data);
      alert("요청한 자원이 존재하지 않습니다.");
    }

    console.error("Error response:", error.response);
    return Promise.reject(error);
  }
);

export default instance;