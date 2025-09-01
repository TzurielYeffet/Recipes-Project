const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const filePath = path.join(__dirname, "../db/recepies.json");

async function getAllRecepies() {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users file:", err);
    return [];
  }
}

const getRecepiesById = async (id) => {
  const db = await getAllRecepies();
  const recipe = db.find((rec) => rec.id === id);
  return recipe;
};

const addRecipe = async (recipe) => {
  try {
    const id = uuidv4();
    const dateCreated = new Date().toISOString();
    const recipesArr = await getAllRecepies();
    recipe.id = id;
    recipe.createdAt = dateCreated;
    recipesArr.push(recipe);
    fs.promises.writeFile(filePath, JSON.stringify(recipesArr), "utf-8");
    return  {status:true,recipe:recipe};
  } catch (err) {
    console.error(err);
    return  {status:true,recipe:null};
  }
};

const updateRecipe = async (recipe) => {
  try {
    const recipesArr = await getAllRecepies();
    let index = recipesArr.findIndex((rec) => rec.id === recipe.id);

    const updatedRecipe = {
      ...recipesArr[index],
      ...recipe,
      updatedAt: new Date().toISOString()
    };

    recipesArr[index] = updatedRecipe;

    fs.promises.writeFile(filePath, recipesArr, "utf-8");
    return {status:true,recipe:updatedRecipe};
  } catch (err) {
    console.error(err);
    return {status:false,recipe:null};
  }
};

const deleteRecipe = async(id)=>{
  try{

    const recipesArr = await getAllRecepies()
    const index = recipesArr.findIndex(rec => rec.id === id)
    recipesArr.splice(index,1)
    fs.promises.writeFile(filePath,recipesArr,"utf-8")
    return true
  }catch(err){
    console.error(err)
    return false
  }

}

module.exports = { getAllRecepies, getRecepiesById, addRecipe ,updateRecipe,deleteRecipe};
