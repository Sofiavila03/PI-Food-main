const { Router } = require('express');
const { getRecipe } = require('../controllers/detailRecipes')
const detailRecipesRouter = Router();
detailRecipesRouter.get("/:id", getRecipe)

module.exports = { detailRecipesRouter };