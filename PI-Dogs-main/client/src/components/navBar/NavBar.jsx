import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='mainContainer-NavBar'>
      <ul className='lista-NavBar'>
        <Link exact to='/home' >
        <li>Inicio</li>
        </Link>
        <Link to='/about'>
        <li>Sobre mi</li>
        </Link>
        <Link to='/contact'>
        <li>Contacto</li>
        </Link>
        <Link to='/createDog'>
        <li>Crear Perrito</li>
        </Link>
      </ul>
    </div>
  )
}

export default NavBar