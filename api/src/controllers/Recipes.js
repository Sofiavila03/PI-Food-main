const { Recipe, Diet } = require('../db');
// const { DBFormatRecipes } = require('../helper/DBFormatRecipes');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
// const { Op } = require('sequelize');
const URL = 'https://api.spoonacular.com/recipes/complexSearch';

const getRecipesByName = async (title) => {
  const recipesAPI = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`)
  const api = recipesAPI.data.results;

  const recipesDB = await Recipe.findAll({
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

  const allRecipes = api.concat(recipesDB)
  const filtername = allRecipes.filter((api) => api.title.toLowerCase().includes(title.toLowerCase()) //filtro las recetas de la api + DB
  );


  return filtername

}

const getRecipes = async () => {
  const details = await axios(`${URL}?apiKey=${API_KEY}&addRecipeInformation=true&number=10`)

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

  return [...details.data.results, ...detailsDB]
}

module.exports = { getRecipesByName, getRecipes }
