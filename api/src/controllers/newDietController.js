const { Diet } = require('../db');

//para crear una receta y asociarla a una o varias dietas de la DB
const createDiet = async ({ id, name }) => {
    const post = await Diet.create({ id, name })
    if (name && name.length > 0) {
        const foundDiets = await Diet.findAll({ //para buscar todas las dietas que queremos asociar a la receta
            where: { name: name }
        })

    }

    return post //representa la receta creada y asociada a las dieta en la DB
}

module.exports = { createDiet };