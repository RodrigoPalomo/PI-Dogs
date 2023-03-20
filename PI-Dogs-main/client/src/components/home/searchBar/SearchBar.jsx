import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import { getNameDog } from '../../../redux/actions/actions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    console.log(name);
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameDog(name))
  }

  return (
    <div>
      <input type="text" placeholder='Buscar...' onChange={handleInputChange}/>
      <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>
  )
}

export default SearchBar
