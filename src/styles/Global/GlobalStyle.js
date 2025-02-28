// GlobalStyle.jsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard', sans-serif; 
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
