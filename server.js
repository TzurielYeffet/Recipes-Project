const express = require("express");
const logger = require("./middlewares/logging.js");
const errorHandler = require("./middlewares/errorHandler.js");
const recipeRouter = require("./routes/recipeRoutes.js");
const db = require("./db/models/index.js");
const PORT = 3000;

const app = express();
app.use(express.json());
(async () => {
try {
  await db.sequelize.authenticate();
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (err) {
  console.error("Database connection failed:", err);
}
})();
app.use(logger);
app.use("/api", recipeRouter);

app.use(errorHandler)
