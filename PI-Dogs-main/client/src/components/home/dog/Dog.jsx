import React from 'react';
import './Dog.css';
import { Link } from 'react-router-dom'

const Dog = ({ image, name, temperament, weightMin, weightMax, averageWeight, id }) => {
  return (
    <div className='mainContainer-Dog'>
      <Link to= {`/detail/${id}`}>
        <img className='img-Dog' src={image} alt={name} />
      </Link>
      <h2>{name}</h2>
      <h3>Temperament: {temperament}</h3>
      <h3>Peso Mínimo: {weightMin} ~ Peso Máximo: {weightMax}</h3>
      <h3>Peso Promedio: {averageWeight}</h3>
    </div>
  )
}

export default Dog;