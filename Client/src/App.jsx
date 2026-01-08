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
import Unauthorized from './pages/Unauthorized'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  const loc = useLocation();
  const show = !loc.pathname.includes('/donor') && !loc.pathname.includes('/ngo') && !loc.pathname.includes('/register')
  const {userData} = useContext(UserContext);
  return (
    <div>
      <Toaster />
      <ScrollToTop />
      {show && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/donor/*' element={userData?.role === "donor" ? <Donor /> : <Unauthorized />} />
        <Route path='/ngo/*' element={userData?.role === "ngo" ? <Ngo /> : <Unauthorized />} />
      </Routes>
      {show && <Footer />}
    </div>
  )
}

export default App
