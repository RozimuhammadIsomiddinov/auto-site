"use strict";

export const migationFile = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.Array,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      milage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fuel: {
        type: Sequelize.ENUM("petrol", "electric", "hybrid", "dezil"),
        allowNull: false,
      },
      volume: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      horsepower: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      drive: {
        type: Sequelize.ENUM("both", "all"),
        allowNull: false,
      },
      checkpoint: {
        type: Sequelize.ENUM("automatic", "manual"),
        allowNull: false,
      },
      doors: {
        type: Sequelize.INTEGER,
      },
      body: {
        type: Sequelize.ENUM(
          "hatchback",
          "convertible",
          "crossover",
          "coupe",
          "sedan",
          "pickup",
          "suv",
          "van",
          "mpv",
          "jeep",
          "wagon",
          "cabriolet",
          "roadster",
          "microcar",
          "estate",
          "saloon",
          "city-car"
        ),
      },
      statement: {
        type: Sequelize.ENUM("used", "new"),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("cars");
  },
};
