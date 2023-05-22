const { Diet } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getDiets = async () => {
    const dietsDB = []
    const dietsAPI = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`)
    const arrayDiets = dietsAPI.data.results.map(recipe => recipe.diets)
    for (let i = 0; i < arrayDiets.length; i++) {
        for (let j = 0; j < arrayDiets[i].length; j++) {
            if (!dietsDB.includes(arrayDiets[i][j])) {
                dietsDB.push(arrayDiets[i][j])
            }
        }
    }
    await Diet.bulkCreate(dietsDB.map(diet => {
        return {
            name: diet
        }
    }), { ignoreDuplicates: true })
    console.log('DB CARGADA');
}

const getDietsDB = async () => {
    const diets = await Diet.findAll()
    return diets
}

module.exports = { getDiets, getDietsDB }