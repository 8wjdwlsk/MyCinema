import React from 'react'
import logoImg from "../assets/cinema.png"
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <h1 className="logo">
        <Link to="/">
          <img src={logoImg} alt="logo" /> <span>My</span><span>cinema</span>
        </Link>
      </h1>

      <nav className="gnb">
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/genre" >장르별</NavLink>
        <NavLink to="/recommend" >AI추천</NavLink>
        <NavLink to="/like" >찜 목록</NavLink>
        <NavLink to="/mycinema" >Mycinema</NavLink>
      </nav>
    </header>
  )
}

export default Navbar