import React from 'react'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import DelosRing from './pages/Products/DelosRing'
import Footer from './components/Footer'
import CategoryPage from './pages/CategoryPage'
import { Route, Routes, Navigate} from 'react-router-dom'
import ContactUs from './pages/ContactUs'

import WhatsNew from "./pages/WhatsNew";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path='/' element={<HomePage />} />
        <Route path="/whats-new" element={<WhatsNew />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path='/products/:slug' element={<DelosRing />} />
        <Route path='/contact' element={<ContactUs />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
