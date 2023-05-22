const {getDietsDB} = require('../controllers/diets')

const dietsHandler = async (req, res) => {
    try {
        const diets = await getDietsDB()
        res.status(200).json(diets) 
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = { dietsHandler };