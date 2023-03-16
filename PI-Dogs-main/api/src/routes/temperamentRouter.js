const { Router } =  require ("express");
const {getAllTempHandlers} = require("../handlers/temperamentHandler");

const temperamentRouter= Router();

temperamentRouter.get("/", getAllTempHandlers);

module.exports = temperamentRouter;