import React from 'react'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'

import { Route, Routes, Navigate} from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
      
      <Route path='/' element={<Navigate to="/home" />} />
      <Route path='/home' element={<HomePage />} />
    

      </Routes>
    </div>
  )
}

export default App
