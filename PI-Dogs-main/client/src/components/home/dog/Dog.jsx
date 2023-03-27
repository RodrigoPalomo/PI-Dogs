import React from 'react';
import { Link } from 'react-router-dom'
import './Dog.css';

const Dog = ({ image, name, temperament, weightMin, weightMax, averageWeight, id }) => {
  return (
    <div className='mainContainer-Dog'>
      <div className='card-Dog'>
        <Link to={`/detail/${id}`}>
          <img src={image} alt={name} width='200px' height='200px' />
        </Link>
        <h3>{name}</h3>
        <h4>Temperamento: {temperament}</h4>
        <h5>Peso Mínimo: {weightMin}</h5>
        <h5>Peso Máximo: {weightMax}</h5>
        <h5>Peso Promedio: {averageWeight}</h5>
      </div>
    </div>
  )
}

export default Dog;