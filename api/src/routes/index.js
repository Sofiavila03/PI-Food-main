const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getRecipe } = require("../controllers/Recipes");
const { detailRecipe } = require("../controllers/DetailRecipes");
const { newRecipe } = require("../controllers/NewRecipe");
const { dietController, getDietsDB } = require("../controllers/Diets");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipe", getRecipe);
router.get("/diets", getDietsDB);
router.get("/recipe/:idRecipe", detailRecipe);
router.post("/recipe", newRecipe);

module.exports = router;
