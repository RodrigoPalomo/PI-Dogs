const {
  getBreeds,
  getBreedsByName,
  getBreedById,
  createNewDog,
} = require("../controllers/dogsController");

const getBreedsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    // si no existe name
    if (!name) {
      //ejecuto la función de getBreeds(); y la guardo en result
      let result = await getBreeds();
      // respondo 200 con result
      return res.status(200).json(result);
    } else {
      // caso contrario, si existe name
      // ejecuto la funcion getBreedsByName y la guardo en result
      let result = await getBreedsByName(name);
      // respondo 200 y result
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getRazaByIdHandler = async (req, res) => {
  const { idRaza } = req.params;
  try {
    let result = await getBreedById(idRaza);
    // la función recibe por parámetro el id de la raza
    // responde con 200 el result
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createNewDogHandler = async (req, res) => {
  let { weight, height, name, life_span, image, temperament, from_DB } =
    req.body;
  try {
    await createNewDog(weight, height, name, life_span, image, temperament);
    // espera los datos
    res.status(200).send("New dog successfully created");
    // si todo salió bien 200 OK
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBreedsHandler,
  getRazaByIdHandler,
  createNewDogHandler,
};
