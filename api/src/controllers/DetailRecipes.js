const { Recipe, Diet } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params
    let formatDetail; //para almacenar el detalle de la receta
    if (!id.includes("-")) { //verifica si el ID no incluye un caracter no numerico
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      const api = response.data; //se almacenan los datos en api
      formatDetail = {
        id: api.id,
        title: api.title,
        image: api.image,
        summary: api.summary,
        healthScore: api.healthScore,
        steps: api.instructions,
        diets: api.diets.map(diet => { //mapeo las dietas para obtener el nombre de cada dieta
          return {
            name: diet
          }
        })
      }
    } else {
      formatDetail = await Recipe.findOne({ //para buscar la receta el la DB que coincida con el id
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
    res.status(200).json(formatDetail)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { getRecipe };
