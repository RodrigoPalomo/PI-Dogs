import React from 'react';
import './Dog.css';

const Dog = ({image, name, temperament, weight}) => {
  return (
    <div className='mainContainer-Dog'>
      <img className='img-Dog' src={image} alt={name} />
      <h2>{name}</h2>
      <h3>Temperament: {temperament}</h3>
      <h3>Weight: {weight}</h3>
    </div>
  )
}

export default Dog;