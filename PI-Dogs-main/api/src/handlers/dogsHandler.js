const {
  getBreeds,
  getBreedsByName,
  getBreedById,
  createNewDog,
} = require("../controllers/dogsController");

const getBreedsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    // si existe name
    if (name) {
      //ejecuto la función de getBreeds(); y la guardo en result
      let result = await getBreedsByName(name);
      // respondo 200 con result
      return res.status(200).json(result);
    } else {
      // caso contrario, si existe name
      // ejecuto la funcion getBreedsByName y la guardo en result
      let result = await getBreeds();
      // respondo 200 y result
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getRazaByIdHandler = async (req, res) => {
  const { idRaza } = req.params;
  let origin= isNaN(idRaza) ? "db" : "api";
  try {
    let result = await getBreedById(idRaza, origin);
    if(result.error) throw new Error(result.error);
    // la función recibe por parámetro el id de la raza y el origen
    // responde con 200 el result
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createNewDogHandler = async (req, res) => {
  let { weightMin, weightMax, height, name, life_span, image, temperaments, from_DB} =
    req.body;
  try {
    // espera los datos
    await createNewDog(weightMin, weightMax, height, name, life_span, image, temperaments);
    res.status(200).send("Nuevo perrito creado perfectamente");
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
