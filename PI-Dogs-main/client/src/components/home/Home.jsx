import React from 'react'
import AllDogs from './allDogs/AllDogs';
import './Home.css';

const Home = () => {
  return (
    <>
      <div>
        <h1 className='title-Home'>Perros, muchos perros</h1>
        <AllDogs />
      </div>
    </>
  )
}

export default Home;