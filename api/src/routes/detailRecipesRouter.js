const { Router } = require('express');
const { detailRecipeHandler } = require('../handlers/detailRecipesHandler')
const detailRecipesRouter = Router();
detailRecipesRouter.get("/:id", detailRecipeHandler)

module.exports = { detailRecipesRouter };