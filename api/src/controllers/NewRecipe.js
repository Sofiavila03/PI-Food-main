const { Recipe, Diet } = require('../db');

const createRecipe = async ({ title, image, summary, healthScore, steps, diets }) => {
    const post = await Recipe.create({ title, image, summary, healthScore, steps })
    if (diets && diets.length > 0) {
        const foundDiets = await Diet.findAll({
            where: { name: diets }
        })
        await post.addDiets(foundDiets)
    }

    return post
}

module.exports = { createRecipe };