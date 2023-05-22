const { Router } = require('express');
const {recipesHandler} = require('../handlers/recipesHandler');
const recipesRouter = Router();
recipesRouter.get("/", recipesHandler);

module.exports = {recipesRouter};