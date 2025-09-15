"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Recipes", {
      recipe_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      ingredients: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      instructions: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      cookingTime: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      servings: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      difficulty: {
        allowNull: true,
        type: Sequelize.ENUM("easy", "medium", "hard"),
      },
      imageUrl: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      isPublic: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Recipes");
  },
};
