import { useEffect } from "react";
// 카카오로 링크를 접속해도 크롬이나 사파리로 보게 하기 위한 코드입니다.
// 이 코드는 따로 건들이실 필요 없을것같습니다. 아마도..?
const OpenExternalBrowser = () => {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const currentUrl = window.location.href;

    const inappdeny_exec_vanillajs = (callback) => {
      if (document.readyState !== "loading") {
        callback();
      } else {
        document.addEventListener("DOMContentLoaded", callback);
      }
    };

    const redirect = () => {
      if (userAgent.includes("kakaotalk")) {
        // 카카오톡 인앱 브라우저 감지 및 외부 브라우저로 리디렉션
        window.location.href = "kakaotalk://web/openExternal?url=" + encodeURIComponent(currentUrl);
      } else if (userAgent.includes("line")) {
        // 라인 인앱 브라우저 감지 및 외부 브라우저로 리디렉션
        window.location.href =
          currentUrl.indexOf("?") !== -1
            ? currentUrl + "&openExternalBrowser=1"
            : currentUrl + "?openExternalBrowser=1";
      } else if (
        userAgent.match(
          /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\/[^1]/i,
        )
      ) {
        // 기타 인앱 브라우저 감지 및 외부 브라우저로 리디렉션
        if (/iphone|ipad|ipod/.test(userAgent)) {
          // iOS: Safari에서 열기
          alert(
            'URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"를 누르면 정상적으로 이용하실 수 있습니다.',
          );
          copyToClipboard(currentUrl);
          window.location.href = "x-web-search://?";
        } else {
          // 안드로이드: Chrome에서 열기
          window.location.href =
            "intent://" +
            currentUrl.replace(/https?:\/\//i, "") +
            "#Intent;scheme=https;package=com.android.chrome;end";
        }
      }
    };

    const copyToClipboard = (val) => {
      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);
      textarea.value = val;
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    };

    inappdeny_exec_vanillajs(redirect);
  }, []);

  return null;
};

export default OpenExternalBrowser;
