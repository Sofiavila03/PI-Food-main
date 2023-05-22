const { getRecipesByName } = require('../controllers/recipes')

const recipesHandler = async (req, res) => {
    try {
        const recipes = await getRecipesByName(req.query.name)
        res.status(200).json(recipes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { recipesHandler }