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
            config.headers.Authorization = `Bearer ${accessToken}`;
            config.headers['Content-Type'] = 'application/json'; // 추가
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
    (response) => {
        // 성공 응답은 그대로 반환
        return response;
    },
    async (error) => {
        if (!error.response) {
            console.error("Network error or server is down");
            alert("서버에 연결할 수 없습니다. 다시 시도해 주세요.");
            return Promise.reject(error);
        }
        console.log("에러 내용", error);
        const { config, response: { status, data } } = error;
        console.log("config", config, "status", status, "data", data);
        const originalRequest = config;

        // 액세스 토큰 만료 (401, code: 4012)
        if (status === 401 && data.code === 4012) {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                try {
                    const refreshResponse = await axios.patch(
                        "https://api.festimate.kr/v1/auth/reissue/token",
                        null,
                        {
                            headers: {
                                "Authorization": `Bearer ${refreshToken}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    console.log(refreshResponse);
                    const newAccessToken = refreshResponse.data.data.accessToken;
                    const newRefreshToken = refreshResponse.data.data.refreshToken;

                    // 토큰 업데이트
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
                alert("토큰이 만료되었습니다. 다시 로그인해 주세요.");
                window.location.href = "/";
            }
        }

        // 새로운 상태 코드 처리 (기존 코드 유지)
        // 400 Bad Request
        if (status === 400) {
            switch (data.code) {
                case 4000:
                    alert("잘못된 요청입니다.");
                    break;
                case 4001:
                    alert("유효하지 않은 플랫폼 타입입니다.");
                    break;
                case 4002:
                    alert("요청 파라미터가 잘못되었습니다.");
                    break;
                case 4003:
                    alert("입력된 글자수가 허용된 범위를 벗어났습니다.");
                    break;
                case 4004:
                    alert("닉네임은 한글로만 입력 가능합니다.");
                    break;
                case 4005:
                    alert("유효하지 않은 인가 코드입니다.");
                    break;
                case 4006:
                    alert("유효하지 않은 날짜 형식입니다.");
                    break;
                default:
                    alert("잘못된 요청입니다.");
                    break;
            }
        }

        // 401 Unauthorized (기존 4012, SEC-002 제외)
        if (status === 401) {
            switch (data.code) {
                case 4011:
                    alert("액세스 토큰의 값이 올바르지 않습니다.");
                    break;
                case 4012:
                    alert("엑세스 토큰이 만료되었습니다.");
                    break;
                case 4013:
                    alert("초대코드가 만료되었습니다.");
                    break;
                case 4014:
                    alert("페스티벌 기간이 종료되었습니다.");
                    break;
                case 4015:
                    alert("토큰 값이 올바르지 않습니다.");
                    break;
                default:
                    alert("인증 오류가 발생했습니다.");
                    break;
            }
        }

        // 403 Forbidden (기존 메시지 유지, 코드 추가)
        if (status === 403) {
            console.error("권한 오류:", data);
            alert("해당 작업에 대한 권한이 없습니다.");
        }

        // 404 Not Found (기존 메시지 유지, 세부 코드 추가)
        if (status === 404) {
            switch (data.code) {
                case 4040:
                    alert("대상을 찾을 수 없습니다.");
                    break;
                case 4041:
                    alert("존재하지 않는 회원입니다.");
                    break;
                case 4042:
                    // 축제 id가 올바르지 않을때
                    break;
                case 4043:
                    alert("존재하지 않는 참가자입니다.");
                    break;
                default:
                    alert("요청한 자원이 존재하지 않습니다.");
                    break;
            }
        }

        // 405 Method Not Allowed
        if (status === 405 && data.code === 4050) {
            alert("잘못된 HTTP method 요청입니다.");
        }

        // 409 Conflict
        if (status === 409) {
            switch (data.code) {
                case 4090:
                    alert("이미 존재하는 리소스입니다.");
                    break;
                case 4091:
                    alert("이미 존재하는 회원입니다.");
                    break;
                case 4092:
                    alert("이미 존재하는 참여자입니다.");
                    break;
                case 4093:
                    alert("포인트가 부족합니다.");
                    break;
                default:
                    alert("리소스 충돌이 발생했습니다.");
                    break;
            }
        }

        // 500 Internal Server Error (기존 메시지 유지, 코드 추가)
        if (status === 500) {
            console.error("Server error:", data);
            alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }

        console.error("Error response:", error.response);
        return error.response;
    }
);

export default instance;