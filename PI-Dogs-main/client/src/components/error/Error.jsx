import React from 'react';
import notFound from './notFound.jpg';
import { Link } from 'react-router-dom';
import './Error.css';

const Error = () => {
  return (
    <div className='mainContainer-Error'>
      <h1>ERROR 404 NOT FOUND</h1>
      <img src={notFound} alt="notFound" />
      <h3>La ruta a la que estás queriendo acceder no existe, prueba con otra</h3>
      <button className='btn-Error'><Link to="/home">Volver al inicio</Link></button>
    </div>
  )
}

export default Error
