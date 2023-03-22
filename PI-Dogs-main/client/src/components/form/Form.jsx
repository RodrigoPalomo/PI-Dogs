import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createDog, getAllTemperaments } from "../../redux/actions/actions.js";
import Validate from "./Validate.jsx";

const Form = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments)
  const [inputs, setInputs] = useState({
    name: "",
    height: "",
    life_span: "",
    image: "",
    weightMin: "",
    weightMax: "",
    temperaments: [],
  })

  const [error, setErrors] = useState({})

  const handleInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
  }

  const handleTemperamentChoices = (event) => {
    setInputs({
      ...inputs,
      temperaments: [...inputs.temperaments, event.target.value]
    })
  }

  const handleDelete = (temp) => {
    setInputs({
      ...inputs,
      temperaments: inputs.temperaments.filter(inst => inst !== temp)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createDog(inputs))
    alert("Dog successfully added")
    setInputs({
      name: "",
      height: "",
      life_span: "",
      image: "",
      weightMin: "",
      weightMax: "",
      temperaments: [],
    })
  }

  useEffect(() => {
    dispatch(getAllTemperaments())
  }, []);

  return (
    <div>
      <h1>Completar la lista del perro:</h1>
      <form>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={(event) => handleInputs(event)} />
        </div>

        <div>
          <label>Imagen:</label>
          <input
            type="text"
            name="image"
            value={inputs.image}
            onChange={(event) => handleInputs(event)} />
        </div>

        <div>
          <h4>Peso:</h4>
          <label>Mínimo: </label>
          <input
            type="number"
            name="weightMin"
            value={inputs.weightMin}
            onChange={(event) => handleInputs(event)} />
          <label>Máximo: </label>
          <input
            type="number"
            name="weightMax"
            value={inputs.weightMax}
            onChange={(event) => handleInputs(event)} />
        </div>

        <div>
          <label>Altura: </label>
          <input
            type="text"
            name="height"
            value={inputs.height}
            onChange={(event) => handleInputs(event)} />
        </div>

        <div>
          <label>Esperanza de Vida: </label>
          <input
            type="number"
            name="life_span"
            value={inputs.life_span}
            onChange={(event) => handleInputs(event)} />
        </div>

        <h5>Temperamentos:</h5>
        <select value={temperaments} onChange={(event) => handleTemperamentChoices(event)}>
          <option value="all"></option>
          {temperaments.map((temp) => {
            return (
              <option value={temp} key={temp}>
                {temp}
              </option>
            );
          })}
        </select>
        <h4>Mi perro es:</h4>
        <ul><li>{inputs.temperaments.map(temp => temp + " ,")}</li></ul>
        <button type="submit" onClick={(event) => handleSubmit(event)}>Add my dog</button>
      </form>
      {inputs.temperaments.map(temp =>
        <div>
          <p>{temp}</p>
          <button onClick={() => { handleDelete(temp) }}>X</button>
        </div>
      )}
    </div>
  )
}

export default Form;
