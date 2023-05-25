const { Recipe, Diet } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getRecipe = async (id) => {
  let formatDetail;
  if (!id.includes("-")) { // Si el ID no incluye un caracter no numerico
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const api = response.data;
    formatDetail = {
      id: api.id,
      title: api.title,
      image: api.image,
      summary: api.summary,
      healthScore: api.healthScore,
      steps: api.instructions,
      diets: api.diets.map(diet => {
        return {
          name: diet
        }
      })
    }
  } else {
    formatDetail = await Recipe.findOne({
      where: {
        id: id
      }, include: {
        model: Diet,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    });
  }
  return formatDetail
}

module.exports = { getRecipe };
