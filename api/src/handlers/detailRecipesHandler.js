const {getRecipes, getRecipe} = require('../controllers/detailRecipes')

const detailRecipesHandler = async(req, res) => {
    try {
        const detailRecipes = await getRecipes()
        res.status(200).json(detailRecipes)
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

const detailRecipeHandler = async(req, res) => {
    try {
        const detailRecipe = await getRecipe(req.params.id)
        res.status(200).json(detailRecipe)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {detailRecipesHandler, detailRecipeHandler }

