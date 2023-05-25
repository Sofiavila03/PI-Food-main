const { getRecipesByName, getRecipes } = require('../controllers/recipes')

const getRecipesHandler = async (req, res) => {
    try {
        if (req.query.name !== undefined) {
            const recipes = await getRecipesByName(req.query.name)
            res.status(200).json(recipes)
        } else {
            const detailRecipes = await getRecipes()
            res.status(200).json(detailRecipes)
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// const recipesHandler = async (req, res) => {
//     try {
//         const recipes = await getRecipesByName(req.query.name)
//         res.status(200).json(recipes)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }

module.exports = { getRecipesHandler };