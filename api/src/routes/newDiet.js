const { Router } = require('express');
const { newDietHandler } = require('../handlers/newDietHandler');
const newDietRouter = Router();
newDietRouter.post("/", newDietHandler);

module.exports = { newDietRouter };