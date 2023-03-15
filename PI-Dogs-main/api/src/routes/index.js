const { Router } = require("express");
const axios = require("axios");
const { Temperaments, Dog } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiInfo = await apiURL.data.map((dog) => {
    return {
      id: dog.id,
      image: dog.image.url,
      name: dog.name,
      temperament: dog.temperament,
      weight: dog.weight,
      origin: dog.origin,
      // temperamentCC: dog.temperament,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  let DogDB = await Dog.findAll({
    include: {
      model: Temperaments,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const temperamentDB = DogDB.map((dog) => {
    return {
      id: dog.id,
      image: dog.img,
      name: dog.name,
      temperament: dog.temperaments.map((temper) => temper.name).join(", "),
      life_span: dog.life_span,
      weight: dog.weight,
      origin: dog.origin,
      temperamentCC: dog.temperament,
      created: true,
    };
  });
  return temperamentDB;
};

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);

  return infoTotal;
};

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  try{
  let dogsTotal = await getAllDogs();
  if (name) {
    let dogName = await dogsTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName.length
      ? res.status(200).send(dogName)
      : res.status(404).send("No se encontró el perrito :(");
  } else {
    res.status(200).send(dogsTotal);
  }
}catch (error){
  res.status(404).json('No hay perrito con ese nombre')
}
});
module.exports = router;
