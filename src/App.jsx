import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Apod from './components/Apod'
import Mission from './components/Mission'
import Gallery from './components/Gallery'
import Iss from './components/Iss'
import Homepage from './components/Homepage'
import Modal from './components/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SpaceGallery from './components/SpaceGallery'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/gallery" element={<SpaceGallery />} />          
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
