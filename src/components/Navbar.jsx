import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import './Navbar.css'
function Navbar() {
  return (
    <nav class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <img src={logo}/>
        </div>
        <ul class="nav-links" id="navLinks">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="#">News</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar