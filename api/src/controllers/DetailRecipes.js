const { Recipe } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const URL = 'https://api.spoonacular.com/recipes/complexSearch'

const getRecipes = async () => {
  const details = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
  return details.data.results
}

const getRecipe = async (id) => {
  if (!id.includes("-")) { // Si el ID no incluye un caracter no numerico
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    return response.data;
  } else {
    return await Recipe.findByPk(id); // Si el ID es alfanumérico (UUID), buscar en la base de datos
  }
}

module.exports = { getRecipes, getRecipe };
