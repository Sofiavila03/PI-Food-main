const { Router } = require('express');           // Importar todos los routers; Ejemplo: const authRouter = require('./auth.js')
const {detailRecipesRouter}= require('./detailRecipesRouter.js');
const {dietsRouter} = require('./dietsRouter.js');
const {newRecipeRouter} = require('./newRecipeRouter.js');
const {recipesRouter} = require('./recipesRouter.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/detail', detailRecipesRouter);
router.use('/diets', dietsRouter);
router.use('/newRecipe', newRecipeRouter);
router.use('/recipes', recipesRouter);

module.exports = router;
