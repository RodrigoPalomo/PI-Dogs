import React from 'react'
import AllDogs from './allDogs/AllDogs';
import { getAllBreeds } from '../../redux/actions/actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Home.css';

const Home = () => {
  const [dog, setDog]=useState("");
  const dispatch = useDispatch();
  const handleClick = (event)=>{
    event.preventDefault();
    dispatch(getAllBreeds());
    setDog("");
  }
  return (
    <>
      <div>
        <h1 className='title-Home'>Perros, muchos perros</h1>
        <div>
          <button onClick={(event)=> handleClick(event)}>Traer perros</button>
        </div>
        <AllDogs />
      </div>
    </>
  )
}

export default Home;