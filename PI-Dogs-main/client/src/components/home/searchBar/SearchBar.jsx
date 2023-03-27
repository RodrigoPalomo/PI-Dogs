import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { getAllBreeds, getName } from '../../../redux/actions/actions';
import './SearchBar.css'

const SearchBar = ({ setCurrentPage }) => {
  const [dog, setDog] = useState("");

  const dispatch = useDispatch();

  const handleClick = (event)=>{
    event.preventDefault();
    dispatch(getAllBreeds());
    setDog("");
  }
  const handleChange = (event) => {
    dispatch(getName(event))
    setCurrentPage(1)
  }

  return (
    <div className='mainContainer-SearchBar'>
      <div>
      </div>
        {/* <button className='dogsBack-SearchBar' onClick={(event) => handleClick(event)}>Traer perros devuelta</button> */}
        <button className="dogsBack-SearchBar" onClick={(event) => handleClick(event)} >Traer perros devuelta</button>
      <input className='search-SearchBar' type="text" value={dog} placeholder='Buscar raza...' onChange={(event) => { setDog(event.target.value); handleChange(event.target.value) }} />
      <button className='btn-SearchBar' type="submit">Buscar</button>
    </div>
  )
}

export default SearchBar
