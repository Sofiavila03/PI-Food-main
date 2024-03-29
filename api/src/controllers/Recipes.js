const { Recipe, Diet } = require('../db');
// const { DBFormatRecipes } = require('../helper/DBFormatRecipes');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
// const { Op } = require('sequelize');
const URL = 'https://api.spoonacular.com/recipes/complexSearch';

const getRecipesByName = async (title) => { //obtiene las recetas filtradas por su nombre
  const recipesAPI = await axios(`${URL}?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
  const api = recipesAPI.data.results;

  const recipesDB = await Recipe.findAll({ //para buscar en la DB todas las recetas
    include: {
      model: Diet, //para obtener las dietas asociadas a cada receta
    }
  }).then(data => data.map(recipe => { //para transformar el formato de las recetas
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      steps: recipe.steps,
      diets: recipe.diets.map(diet => diet.name)
    }
  }))

  const allRecipes = api.concat(recipesDB) //combinamos las recetas de la API con las de la DB
  const filtername = allRecipes.filter((api) => api.title.toLowerCase().includes(title.toLowerCase()) //filtro las recetas de la api + DB
  );


  return filtername

}

const getRecipes = async () => { //obtiene todas las recetas(sin filtros)
  const details = await axios(`${URL}?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

  const detailsDB = await Recipe.findAll({
    include: {
      model: Diet,
    }
  }).then(data => data.map(recipe => {
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      steps: recipe.steps,
      diets: recipe.diets.map(diet => diet.name)
    }
  }))

  return [...detailsDB, ...details.data.results]
}

module.exports = { getRecipesByName, getRecipes }
