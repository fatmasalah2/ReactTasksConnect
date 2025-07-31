import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // ana hena b3ml render 
  // bdkhl el react project bta3i fy html


  // zwdt kman browserrouter 
  // 34n atn2l ben lpages bt3ty

  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
