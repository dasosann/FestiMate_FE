import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from 'styled-components'
import {theme} from './theme.js'
import GlobalStyle from './styles/Global/GlobalStyle.js'
createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <App />
    </ThemeProvider>
)
