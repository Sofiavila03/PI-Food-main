const { Recipe } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Op } = require('sequelize');

const getRecipesByName = async (title) => {
    const recipesAPI = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${title}`)
    console.log(recipesAPI.data)
    const recipesDB = await Recipe.findAll({
        where: {
            title: {
                [Op.iLike]: `%${title}%`
            }
        }
    })
    return [...recipesDB, ...recipesAPI.data.results]
}

module.exports = { getRecipesByName }