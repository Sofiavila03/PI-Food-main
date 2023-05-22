const { Router } = require('express');
const {detailRecipesHandler, detailRecipeHandler} = require('../handlers/detailRecipesHandler')
const detailRecipesRouter = Router();
detailRecipesRouter.get("/", detailRecipesHandler);
detailRecipesRouter.get("/:id", detailRecipeHandler)

module.exports = {detailRecipesRouter, detailRecipeHandler};