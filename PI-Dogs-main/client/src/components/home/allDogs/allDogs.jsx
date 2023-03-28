import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { filterByOrigin, getAllBreeds, orderByName, orderByWeight, filterByTemper, getAllTemperaments, setCurrentPage } from "../../../redux/actions/actions.js"
import Dog from "../dog/Dog"
import Pagination from '../pagination/Pagination';
import SearchBar from '../searchBar/SearchBar'
import perritoNotFound from '../allDogs/perritoNotFound.png'
import Loader from '../loader/Loader';
import './AllDogs.css';

const AllDogs = () => {

  const dispatch = useDispatch();
  const dogs = useSelector(state => state.dogs);
  const currentPage = useSelector(state => state.currentPage)

  const [order, setOrder] = useState('');
  const [temperament, setTemperament] = useState('all');
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const [load, setLoad] = useState(true);
  const [filter, setFilter] = useState({
    name: "name",
    origin: "All",
    temperament: "all",
    weight: "weight",
    aver: "aver",
  })

  const numOfLastDog = currentPage * dogsPerPage;
  const numOfFirstDog = numOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(numOfFirstDog, numOfLastDog)

  const pagination = (page) => {
    dispatch(setCurrentPage(page))
  }

  const temperaments = useSelector(state => [...state.temperaments].sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }))

  const handleOrder1 = (event) => {
    dispatch(orderByName(event.target.value));
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`);
    setFilter({
      ...filter,
      name: event.target.value
    })
  }

  const handleOrder2 = (event) => {
    dispatch(orderByWeight(event.target.value));
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`);
    setFilter({
      ...filter,
      weight: event.target.value
    })
  }

  const handleOrder3 = (event) => {
    dispatch(orderByWeight(event.target.value));
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`);
    setFilter({
      ...filter,
      aver: event.target.value
    })
  }


  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value))
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`)
    setFilter({
      ...filter,
      origin: event.target.value
    })
  }

  const handleFilterByTemperament = (event) => {
    setTemperament(event.target.value)
    dispatch(filterByTemper(event.target.value))
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`)
    setFilter({
      ...filter,
      temperament: event.target.value
    })
  }
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getAllBreeds());
    dispatch(setCurrentPage(1));
    setFilter({
      name: "name",
      origin: "All",
      temperament: "all",
      weight: "weight",
      aver: "aver",
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 5000)
    dispatch(getAllBreeds())
    dispatch(getAllTemperaments())
  }, [dispatch]);

  return (
  <div>
      <SearchBar />
      <div className='containerBtn-AllDogs'>
        <button className="dogsBack-AllDogs" onClick={(event) => handleClick(event)} >Traer perros devuelta</button>
      </div>
      {load && !currentDogs.length ? (<><Loader /></>) : (<>
        <div>
          <section className='filters-AllDogs'>
            {/* <p>Ordenar</p> */}
            <select value={filter.name} onChange={event => { handleOrder1(event) }}>
              <option value="name" disabled selected>Ordenar</option>
              <option value="a-z">De la A a la Z</option>
              <option value="z-a">De la Z a la A</option>
            </select>

            <p></p>
            <select value={filter.weight} onChange={event => { handleOrder2(event) }}>
              <option value="weight" disabled selected>Ordenar</option>
              <option value="min">Del más liviano al mas pesado</option>
              <option value="max">Del más pesado al mas liviano</option>
            </select>

            <select value={filter.aver} onChange={event => { handleOrder3(event) }}>
              <option value="aver" disabled selected>Ordenar</option>
              <option value="ave">Del más liviano al mas pesado promedio</option>
              <option value="ave-max">Del más pesado al mas liviano promedio</option>
            </select>

            <select value={filter.origin} onChange={event => { handleFilterByOrigin(event) }}>
              <option value="All">Todos los perros</option>
              <option value="api">Perros API</option>
              <option value="from_DB">Mis perros</option>
            </select>

            <select value={filter.temperament} onChange={event => { handleFilterByTemperament(event) }}>
              <option value="all">Temperamentos</option>
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

          {currentDogs.length ? (<div className='cardDogs-AllDogs'>
            {
              currentDogs?.map(dog => {
                return (
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
                )
              })
            }
          </div>) :
            (<div className='perritoNotFound-AllDogs'>
              <h3>Este pichicho no existe</h3>
              <img src={perritoNotFound} />
              <h3>Peeero ¿Por qué no crearlo? ;)</h3>
            </div>)}
        </div>
        </>)}
      </div>)
      }
      export default AllDogs