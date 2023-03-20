import React from 'react'
import AllDogs from './allDogs/AllDogs';
import SearchBar from './searchBar/SearchBar';
import './Home.css';

const Home = () => {
  return (
    <>
      <div>
        <h1 className='title-Home'>Perros, muchos perros</h1>
        <SearchBar />
        <AllDogs />
      </div>
    </>
  )
}

export default Home;