const { Router } = require('express');
const {newRecipeHandler} = require('../handlers/newRecipeHandler');
const newRecipeRouter = Router();
newRecipeRouter.post("/", newRecipeHandler);

module.exports = {newRecipeRouter};