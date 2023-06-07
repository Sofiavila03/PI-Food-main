const { Recipe, Diet } = require('../db');

//para crear una receta y asociarla a una o varias dietas de la DB
const createRecipe = async ({ title, image, summary, healthScore, steps, diets }) => {
    const post = await Recipe.create({ title, image, summary, healthScore, steps })
    if (diets && diets.length > 0) {
        const foundDiets = await Diet.findAll({ //para buscar todas las dietas que queremos asociar a la receta
            where: { name: diets }
        })
        await post.addDiets(foundDiets)//para asociar esas dietas a la receta
    }

    return post //representa la receta creada y asociada a las dieta en la DB
}

module.exports = { createRecipe };