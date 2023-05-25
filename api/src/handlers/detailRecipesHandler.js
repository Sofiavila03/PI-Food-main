const { getRecipe} = require('../controllers/detailRecipes')

const detailRecipeHandler = async(req, res) => {
    try {
        const detailRecipe = await getRecipe(req.params.id)
        res.status(200).json(detailRecipe)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = { detailRecipeHandler }

