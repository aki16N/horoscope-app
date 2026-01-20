import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Header from './component/Header'
import "bootstrap/dist/css/bootstrap.min.css";
import MainForm from './component/MainForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    {/* <MainForm /> */}
    <App />
  </StrictMode>,
)
