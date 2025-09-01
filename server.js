const express = require("express")
const logger = require("./middlewares/logging.js")
const errorHandler = require("./middlewares/errorHandler.js")
const recipeRouter = require("./routes/recipeRoutes.js");
const PORT = 3000

const app = express()
app.use(express.json())
app.use(logger)
app.use("/api",recipeRouter)






app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})