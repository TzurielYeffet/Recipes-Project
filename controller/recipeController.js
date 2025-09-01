const recipeModel = require("../model/RecipeModel.js");
const allowedFilters = ["difficulty", "maxCookingTime", "search"];

function queryParamToArray(param) {
  if (!param) return [];
  if (Array.isArray(param)) {
    return param
      .flatMap((p) => p.split(","))
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return param
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const getRecepieById = async (req, res, next) => {
  try {
    const data = await recipeModel.getRecepiesById(req.params.id);
    if (!data) {
      const err = new Error("Recipe not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getRecipesByQuery = async (req, res, next) => {
  try {
    const db = await recipeModel.getAllRecepies();
    const allowedFilters = ["title", "description", "tags"];
    const queryKeys = Object.keys(req.query);

    if (queryKeys.length === 0) {
      return res.status(200).json(db);
    }

    if (queryKeys.length > 3) {
      const err = new Error("Invalid API call: too many query parameters");
      err.status = 403;
      throw err;
    }

    for (let key of queryKeys) {
      if (!allowedFilters.includes(key)) {
        const err = new Error(`Invalid query attribute: ${key}`);
        err.status = 403;
        throw err;
      }
    }

    let filtered = db;

    for (let key of queryKeys) {
      const values = queryParamToArray(req.query[key]);

      filtered = filtered.filter((item) => {
        const itemValue = item[key];

        if (!itemValue) return false;

        if (typeof itemValue === "string") {
          return values.some((v) =>
            itemValue.toLowerCase().includes(v.toLowerCase())
          );
        }

        if (Array.isArray(itemValue)) {
          return values.some((v) => itemValue.includes(v));
        }

        return values.includes(itemValue);
      });
    }

    res.status(200).json(filtered);
  } catch (err) {
    next(err);
  }
};

const addRecipe = async (req, res, next) => {
  try {
    const result = await recipeModel.addRecipe(req.body);
    if (!result.success) {
      const err = new Error("Cannot add new recipe");
      err.status = 415;
      throw err;
    }
    res.status(201).json(result.data);
  } catch (err) {
    next(err);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const result = await recipeModel.updateRecipe(req.body);
    if (!result.success) {
      const err = new Error("Recipe not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json(result.data);
  } catch (err) {
    next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await recipeModel.deleteRecipe(id);
    if (!result) {
      const err = new Error("Recipe not found");
      err.status = 404;
      throw err;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const getRecipesStats = async (req, res, next) => {
  try {
    const recipesArr = await recipeModel.getAllRecepies();

    const easyCount = recipesArr.filter((r) => r.difficulty === "easy").length;
    const mediumCount = recipesArr.filter((r) => r.difficulty === "medium").length;
    const hardCount = recipesArr.filter((r) => r.difficulty === "hard").length;
    const totalNumOfRecipes = recipesArr.length;

    const averageCookingTime =
      totalNumOfRecipes === 0
        ? 0
        : recipesArr.reduce((sum, item) => sum + item.cookingTime, 0) / totalNumOfRecipes;

    res.status(200).json({
      totalNumOfRecipes,
      averageCookingTime,
      difficultyCounts: { easy: easyCount, medium: mediumCount, hard: hardCount },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRecepieById,
  getRecipesByQuery,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesStats,
};
