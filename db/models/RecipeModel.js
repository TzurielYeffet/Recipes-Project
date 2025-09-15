module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    recipe_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    ingredients: {
      type: DataTypes.JSON,
    },
    instructions: {
      type: DataTypes.JSON,
    },
    cookingTime: {
      type: DataTypes.INTEGER,
    },
    servings: {
      type: DataTypes.INTEGER,
    },
    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User,{foreignKey:"user_id"})
    Recipe.belongsToMany(models.User, { 
      through:models.UserFavorite,
      foreignKey: "recipe_id" });
  };
  return Recipe;
};
