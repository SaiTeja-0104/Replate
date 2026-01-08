import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Ngo from './pages/Ngo'
import Donor from './pages/Donor'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import { Analytics } from "@vercel/analytics/next"

const App = () => {
  const loc = useLocation();
  const show = !loc.pathname.includes('/donor') && !loc.pathname.includes('/ngo') && !loc.pathname.includes('/register')
  const { userData } = useContext(UserContext);
  return (
    <div>
      <Toaster />
      <ScrollToTop />
      <Analytics />
      {show && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path="/donor/*"
          element={
            <ProtectedRoute role="donor" userData={userData}>
              <Donor />
            </ProtectedRoute>
          }
        />

        <Route path="/ngo/*"
          element={
            <ProtectedRoute role="ngo" userData={userData}>
              <Ngo />
            </ProtectedRoute>
          }
        />

      </Routes>
      {show && <Footer />}
    </div>
  )
}

export default App
