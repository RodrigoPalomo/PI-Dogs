import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { filterByOrigin, getAllBreeds, orderByName, orderByWeight, filterByTemper, getAllTemperaments } from "../../../redux/actions/actions.js"
import Dog from "../dog/Dog"
import Pagination from '../pagination/Pagination';
import './AllDogs.css';

const AllDogs = () => {

  const dispatch = useDispatch();
  const dogs = useSelector(state => state.dogs);
  const [order, setOrder] = useState('');
  const [temperament, setTemperament] = useState('all');

  const [currentPage, setCurrentPage] = useState(1)
  const [dogsPerPage, setDogsPerPage] = useState(8)

  const numOfLastDog = currentPage * dogsPerPage;
  const numOfFirstDog = numOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(numOfFirstDog, numOfLastDog)

  const pagination = (page) => { setCurrentPage(page) }

  const temperaments = useSelector(state => [...state.temperaments].sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }))

  const handleOrder1 = (event) => {
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  const handleOrder2 = (event) => {
    dispatch(orderByWeight(event.target.value));
    setCurrentPage(1)
    setOrder(`Ordered ${event.target.value}`);
  }

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value))
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`)
  }

  const handleFilterByTemperament = (event) => {
    setTemperament(event.target.value)
    dispatch(filterByTemper(event.target.value))
    setCurrentPage(1)
    setOrder(`Ordered ${event.target.value}`)
  }

  useEffect(() => {
    dispatch(getAllBreeds())
    dispatch(getAllTemperaments())
  }, []);

  return (
    <>
      <section className='filters-AllDogs'>
        <select defaultValue="name" onChange={event => { handleOrder1(event) }}>
          <option value="name" disabled selected></option>
          <option value="a-z">from A to Z</option>
          <option value="z-a">from Z to A</option>
        </select>

        <select defaultValue="weight" onChange={event => { handleOrder2(event) }}>
          <option value="weight" disabled selected></option>
          <option value="min">Ordenar desde el mas liviano al mas pesado</option>
          <option value="max">Ordenar desde el mas pesado al mas liviano</option>
        </select>

        <select defaultValue="aver" onChange={event => { handleOrder2(event) }}>
          <option value="aver" disabled selected></option>
          <option value="ave">Ordenar del mas liviano al mas pesado</option>
          <option value="ave-max">Ordenar del mas pesado al mas liviano</option>
        </select>

        <select onChange={event => { handleFilterByOrigin(event) }}>
          <option value="All">All dogs</option>
          <option value="api">Api dogs</option>
          <option value="from_DB">My dogs</option>
        </select>

        <select value={temperament} onChange={event => { handleFilterByTemperament(event) }}>
          <option value="all">Temperaments</option>
          {temperaments.map((temp) => {
            return (
              <option value={temp} key={temp}>
                {temp}
              </option>
            )
          })
          }
        </select>
      </section>

      <Pagination
        dogsPerPage={dogsPerPage}
        dogs={dogs.length}
        pagination={pagination} />

      {
        currentDogs?.map(dog => {
          return (
            <div className='cardDogs-AllDogs' key={dog.id}>
              <Dog
                id={dog.id}
                key={dog.id}
                image={dog.image}
                name={dog.name}
                temperament={dog.temperament}
                weightMin={dog.weightMin}
                weightMax={dog.weightMax}
                averageWeight={dog.averageWeight}
              />
            </div>
          )
        })
      }
    </>
  )
}

export default AllDogs