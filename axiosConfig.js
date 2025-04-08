import Cookies from "js-cookie";
import axios from "axios";

// Axios 기본 설정
const instance = axios.create({
  baseURL: "https://api.festimate.kr", // 실제 서버 URL 사용
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    // 엑세스 토큰 및 리프레시 토큰을 쿠키에서 가져옴
    const accessToken = Cookies.get("Authorization");
    // const refreshToken = Cookies.get("RefreshToken"); // 리프레시 토큰도 같이 보냄
    if (!accessToken) {
      window.location.href = "/"; // 페이지를 /로 리다이렉트
      return Promise.reject(new Error("No access token found")); // 요청을 취소하고 에러 반환
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // if (refreshToken) {
    //   config.headers["Refresh-Token"] = refreshToken; // 필요에 따라 리프레시 토큰을 헤더에 추가
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => {
    
    // 서버 응답 헤더에 새 토큰이 있으면 업데이트
    const newAccessToken = response.headers["authorization"];
    // const newRefreshToken = response.headers["refresh-token"];
    
    if (newAccessToken && newAccessToken.startsWith("Bearer ")) {
      const newAccessTokenWithoutBearer = newAccessToken.slice(7);
      // 기존 Authorization 쿠키 삭제
      Cookies.remove("Authorization", { path: "/" });

      // 새로운 Authorization 쿠키 설정
      Cookies.set("Authorization", newAccessTokenWithoutBearer, { path: "/" });
    }
    // console.log("newRefreshToken",newRefreshToken);
    // if (newRefreshToken) {
    //   Cookies.remove("RefreshToken", { path: "/" });
    //   Cookies.set("RefreshToken", newRefreshToken); // 새로운 리프레시 토큰을 쿠키에 저장
    // }

    return response;
  },
  async (error) => {
    if (!error.response) {
      // 서버 응답이 없을 때 (네트워크 에러 등)
      console.error("Network error or server is down");
      alert("서버에 연결할 수 없습니다. 다시 시도해 주세요.");
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    
    // 리프레시 토큰 만료 시, 쿠키를 삭제하고 메인 페이지로 리다이렉트
    if (status === 401 && (data.code === "SEC-001" || data.code === "SEC-002")) {
      // 인증 실패 시 쿠키 삭제 및 리다이렉트
      Cookies.remove("Authorization");
      // Cookies.remove("RefreshToken");
      localStorage.removeItem("token");
      alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
      window.location.href = "/"; // 메인 페이지로 리다이렉트
    }
    
    // 기타 전역적으로 처리해야 하는 에러 처리
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

    // 기타 에러에 대한 추가 핸들링
    console.error("Error response:", error.response);
    return Promise.reject(error);
  }
);

export default instance;