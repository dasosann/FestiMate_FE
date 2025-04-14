import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from 'styled-components'
import {theme} from './theme.js'
import GlobalStyle from './styles/Global/GlobalStyle.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          retry: 1, // 실패 시 재시도 횟수
          staleTime: 1000 * 60 * 5, // 5분 캐싱
      },
      mutations: {
          retry: 1,
      }
  }
});
createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
)
