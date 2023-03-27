import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewDog, getAllTemperaments } from "../../redux/actions/actions";
import Validate from "./Validate.jsx";

const Form = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments)
  const [inputs, setInputs] = useState({
    name: "",
    height: "",
    life_span: "",
    image: "",
    weightMin: "0",
    weightMax: "0",
    temperaments: [],
  })

  const [error, setErrors] = useState({})

  const handleInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
    setErrors(Validate({
      ...inputs,
      [event.target.name]: event.target.value
    }))
  }

  const handleTemperamentChoices = (event) => {
    let { value } = event.target;
    if (inputs.temperaments.includes(value)) {
      return alert("Los temperamentos no pueden repetirse!")
    }
    setInputs({
      ...inputs,
      temperaments: [...inputs.temperaments, value]
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
    dispatch(createNewDog(inputs))
    alert("¡Nuevo pichicho ingresado!")
    setInputs({
      name: "",
      height: "",
      life_span: "",
      image: "",
      weightMin: "0",
      weightMax: "0",
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
          <label>Nombre:
            <input
              type="text"
              name="name"
              value={inputs.name}
              placeholder={"Nombre del pichicho"}
              onChange={(event) => handleInputs(event)} />
            {error.name && <strong>{error.name}</strong>}
          </label>
        </div>

        <div>
          <label>Imagen:
            <input
              type="text"
              name="image"
              value={inputs.image}
              placeholder={"Ej: http://sitioDeLaImagen.jpg"}
              onChange={(event) => handleInputs(event)} />
            {error.image && <strong>{error.image}</strong>}
          </label>
        </div>

        <div>
          <h4>Peso:</h4>
          <label>Mínimo:
            <input
              type="number"
              name="weightMin"
              value={inputs.weightMin}
              onChange={(event) => handleInputs(event)} />
          </label>
          {error.weightMin && <strong>{error.weightMin}</strong>}

          <label>Máximo(Kilogramos):
            <input
              type="number"
              name="weightMax"
              value={inputs.weightMax}
              onChange={(event) => handleInputs(event)}
            />
            {error.weightMax && <strong>{error.weightMax}</strong>}
          </label>
        </div>

        <div>
          <label>Altura(en centímetros):
            <input
              type="text"
              name="height"
              value={inputs.height}
              placeholder={"Por ejemplo: 40 - 65"}
              onChange={(event) => handleInputs(event)} />
            {error.height && <strong>{error.height}</strong>}
          </label>
        </div>

        <div>
          <label>Esperanza de Vida:
            <input
              type="text"
              name="life_span"
              value={inputs.life_span}
              placeholder={"Por ejemplo: 12 - 17"}
              onChange={(event) => handleInputs(event)} />
            {error.life_span && <strong>{error.life_span}</strong>}
          </label>
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
        <ul><div>{inputs.temperaments.map(temp => temp + " ,")}</div></ul>
        <button type="submit" onClick={(event) => handleSubmit(event)} disabled={
          error.name || error.image || error.weightMin || error.weightMax || error.height || error.life_span || error.temperaments || !inputs.name
        }>
          Crear mi pichicho
        </button>
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
