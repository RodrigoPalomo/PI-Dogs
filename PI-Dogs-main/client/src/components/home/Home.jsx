import React from 'react'
import AllDogs from './allDogs/AllDogs';
// import { getAllBreeds } from '../../redux/actions/actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Home.css';

const Home = () => {
  const [dog, setDog]=useState("");
  const dispatch = useDispatch();

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