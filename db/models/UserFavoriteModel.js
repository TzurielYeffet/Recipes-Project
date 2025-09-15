module.exports = (sequelize, DataTypes) => {
  const UserFavorite = sequelize.define("UserFavorite", {
    id: {
      primaryKey: true,
      autoIncrement:true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    recipe_id: {
      type: DataTypes.UUID,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  });

  const associate = (models)=>{
    UserFavorite.belongsTo(models.User,{foriegnKey:"user_id"})
    UserFavorite.belongsTo(models.Recipe,{foriegnKey:"recipe_id"})
  }
  return UserFavorite




};
