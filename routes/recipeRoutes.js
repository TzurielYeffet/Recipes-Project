const express = require("express")
const { validate } = require("../middlewares/validate.js")
const recipeController = require("../controller/recipeController.js")
const { recipeSchema } = require("../validator/recipe.schema.js")

const router = express.Router()

        
router.get("/recipes",recipeController.getRecipesByQuery)


router.get("/recipes/:id",recipeController.getRecepieById)
router.get("/recipes/stats",recipeController.getRecipesStats)

router.post("/recipes",validate(recipeSchema),recipeController.addRecipe)
router.put("/recipes/:id",validate(recipeSchema),recipeController.updateRecipe)
router.delete("/recipes/:id",recipeController.deleteRecipe)

module.exports = router