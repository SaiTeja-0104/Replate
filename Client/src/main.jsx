import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import UserProvider from './context/UserContext.jsx'
import NgoProvider from './context/NgoContext.jsx'
import App from './App.jsx'
import DonorProvider from './context/DonorContext.jsx'
// import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <NgoProvider>
        <DonorProvider>
          <App />
        </DonorProvider>
      </NgoProvider>
    </UserProvider>
  </BrowserRouter>,
)
