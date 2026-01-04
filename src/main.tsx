import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// 1. Importamos HelmetProvider
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. Envolvemos la App */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)