const { Router } = require("express");
const axios = require("axios");
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
      height: dog.height,
      weight: dog.weight,
      life: dog.life_span,
      temperamentCC: dog.temperament,
    };
  });
  return apiInfo;
};

module.exports = router;
