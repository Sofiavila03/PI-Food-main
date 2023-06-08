const { createDiet } = require('../controllers/newDietController')

const newDietHandler = async (req, res) => {
    try {
        const newDiet = await createDiet(req.body)
        res.status(200).json(newDiet)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { newDietHandler }