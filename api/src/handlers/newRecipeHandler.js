const { createRecipe } = require('../controllers/newRecipe')

const newRecipeHandler = async (req, res) => {
    try {
        const newRecipe = await createRecipe(req.body)
        res.status(200).json(newRecipe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { newRecipeHandler }