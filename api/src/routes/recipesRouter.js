const { Router } = require('express');
const { recipesHandler, getRecipesHandler } = require('../handlers/recipesHandler');
const recipesRouter = Router();
recipesRouter.get("/", getRecipesHandler);
// recipesRouter.get("/recipe", recipesHandler);

module.exports = { recipesRouter };