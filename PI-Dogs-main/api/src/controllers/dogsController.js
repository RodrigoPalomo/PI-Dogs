require("dotenv").config();
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

// traigo info de la API:
const getBreedsFromApi = async () => {
  let apiData = await axios(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  let fromApi = await apiData.data.map((inst) => {
    let weightMin = parseInt(inst.weight.metric.slice(0, 2).trim());
    let weightMax = parseInt(inst.weight.metric.slice(4).trim());
    let averageWeight = weightMax + weightMin;

    if (weightMin && weightMax) {
      averageWeight = averageWeight / 2;

    } else if (weightMin && !weightMax) {
      weightMax = weightMin;
      averageWeight = averageWeight / 2;

    } else if (!weightMin && weightMax) {
      weightMin = weightMax;
      averageWeight = averageWeight / 2;
    } else {
      if (inst.name === "Smooth Fox Terrier") {
        weightMin = 6;
        weightMax = 9;
        averageWeight = ((weightMax) + (weightMin)) / 2;
      } else {
        weightMin = 20;
        weightMax = 30;
        averageWeight = ((weightMax) + (weightMin)) / 2;
      }
    }
    return {
      id: inst.id,
      weightMin: weightMin,
      weightMax: weightMax,
      averageWeight: averageWeight,
      height: inst.height,
      name: inst.name,
      life_span: inst.life_span,
      image: inst.image.url,
      temperament: inst.temperament,
    };
  });
  return fromApi;
};

// traigo todo lo que necesito de mi db
const getBreedsFromDb = async () => {
  let dbData = await Dog.findAll({
    // espero a que me traiga todo lo de la base de datos que incluya:
    include: [{
      model: Temperament,
      attributes: ["name"],
      through: { attributes: []},
    }],
  });

  let fromDb = dbData.map((dog) => {
    // mapeo la data de la bd y que me devuelva lo que necesito:
    return {
      id: dog.id,
      weightMax: dog.weightMax,
      weightMin: dog.weightMin,
      averageWeight: (Number(dog.weightMax) + Number(dog.weightMin)) / 2,
      height: dog.height,
      name: dog.name,
      life_span: dog.life_span,
      image: dog.image,
      // si hay temperamento entonces a ese temperamento lo mapeo y que
      // por cada iteración me devuelva el nombre del elemento(el) y a su vez
      // me lo separe con una coma(", "). Sino, por defecto que su temperamento sea "Happy"
      // porque todos los perritos son felices <3
      temperament: dog.Temperaments
        ? dog.Temperaments.map((el) => el.name).join(", ")
        : "Happy",
      from_DB: true,
    };
  });
  // retornamos
  return fromDb;
};

// Vamos a unir la API con la db así
// empezamos a consumir datos de mi base de datos
// para tener que hacer todo una sola vez y no tener
// que estar llamando a la API
const getBreeds = async () => {
  let breedsApi = await getBreedsFromApi();
  let breedsDb = await getBreedsFromDb();
  let breeds = breedsDb? [...breedsApi, ...breedsDb] : breedsApi;
  return breeds;
};

const getBreedsByName = async (name) => {
  let newName = name.toLowerCase();
  let breeds = await getBreeds();
  let result = breeds.filter((dog) => dog.name.toLowerCase().includes(newName));

  if (result.length) {
    return result;
  } else {
    throw new Error("No existe esa raza de perrito");
  }
};

const getBreedById = async (id, origin) => {
  try {
    if (origin === "db") {
      let dogDB = await Dog.findOne({
        where: {
          id: id,
        },
        include: [{
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        }],
      });
      if (dogDB) {
        return {
          id: dogDB.id,
          weightMax: dogDB.weightMax,
          weightMin: dogDB.weightMin,
          averageWeight: (Number(dogDB.weightMax) + Number(dogDB.weightMin)) / 2,
          height: dogDB.height,
          name: dogDB.name,
          life_span: dogDB.life_span,
          image: dogDB.image,
          temperament: dogDB.Temperaments
            ? dogDB.Temperaments.map((el) => el.name).join(", ")
            : "Happy",
          from_DB: true,
        };
      }
    } else {
      let result = await axios(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );

      let doggy = result.data.find((el) => el.id === Number(id));

      let weightMin = parseInt(doggy.weight.metric.slice(0, 2).trim());
      let weightMax = parseInt(doggy.weight.metric.slice(4).trim());
      let averageWeight = weightMax + weightMin;

      if (weightMin && weightMax) {
        averageWeight = averageWeight / 2;
      } else if (weightMin && !weightMax) {
        weightMax = weightMin;
        averageWeight = weightMin;
      } else if (!weightMin && weightMax) {
        weightMin = weightMax;
        averageWeight = weightMax;
      } else if (inst.name === "Smooth Fox Terrier") {
        weightMin = 6;
        weightMax = 9;
        averageWeight = (weightMax + weightMin) / 2;
      } else {
        weightMin = 20;
        weightMax = 30;
        averageWeight = (weightMax + weightMin) / 2;
      }
      let dogDetail = {
        id: doggy.id,
        name: doggy.name,
        height: doggy.height.metric,
        life_span: doggy.life_span,
        image: doggy.image ? doggy.image.url : " ",
        temperament: doggy.temperament,
        weightMin: weightMin,
        weightMax: weightMax,
        averageWeight: averageWeight,
      };
      return dogDetail;
    }
  } catch (error) {
    return { error: `El perro con el id: ${id} no existe` };
  }
};

const createNewDog = async (
  weightMin,
  weightMax,
  height,
  name,
  life_span,
  image,
  temperament,
  from_DB
) => {
  // si alguno de estos datos no existe entonces tirame el error
  if (!weightMin || !weightMax || !height || !name || !life_span || !image || !temperament) {
    throw new Error(
      "Falta información, por favor, complete los datos requeridos."
    );
  } else {
    // caso contrario creame el perrito con la data pasada
    let newDog = await Dog.create({
      name: name,
      height: height,
      life_span: life_span,
      image: image,
      weightMin: weightMin,
      weightMax: weightMax,
      averageWeight: (weightMax + weightMin) / 2,
    });
    let temp = await Temperament.findAll({
      where: {
        name: temperament,
      },
    });
    await newDog.addTemperament(temp);
    // le agregamos el temperamento al perrito
  }
};

module.exports = {
  getBreeds,
  getBreedsByName,
  getBreedById,
  createNewDog,
};
