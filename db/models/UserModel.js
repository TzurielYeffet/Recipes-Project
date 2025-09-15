module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
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


  User.associate = (models)=>{
    User.hasMany(models.Recipe,{foreighKey:"user_id"})
    User.belongsToMany(models.Recipe,{
        through:models.UserFavorite,
        foreighKey:"user_id",
      otherKey:"recipe_id"})
  }
  return User

};
