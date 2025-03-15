import { Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Users jadvalini yaratish
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM("customer", "seller"),
        allowNull: false,
        defaultValue: "customer",
      },
      userrate: {
        type: Sequelize.ENUM("yearly", "monthly", "daily"),
        allowNull: false,
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

    // Cars jadvalini yaratish
    await queryInterface.createTable("cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      color: {
        type: Sequelize.STRING,
        defaultValue: "white",
      },
      image: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
      engine: {
        type: Sequelize.ENUM("petrol", "electric", "hybrid", "diesel"),
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
        type: Sequelize.ENUM("AWD", "FWD", "RWD"),
        allowNull: false,
      },
      checkpoint: {
        type: Sequelize.ENUM("automatic", "manual"),
        allowNull: false,
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
        allowNull: false,
        defaultValue: "sedan",
      },
      statement: {
        type: Sequelize.ENUM("used", "new"),
        allowNull: false,
        defaultValue: "used",
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      authoremail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rate: {
        type: Sequelize.ENUM("cash", "credit"),
        allowNull: false,
        defaultValue: "cash",
      },
      mark_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "car_mark",
          key: "id",
        },
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seen: {
        type: Sequelize.INTEGER,
      },
      liked: {
        type: Sequelize.INTEGER,
      },
      liked_user: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
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

    // Cart jadvalini yaratish
    await queryInterface.createTable("cart", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      product_type: {
        type: Sequelize.ENUM("car", "motorcycle", "commerce"),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      added_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Index qo'shish (Optimallashtirish uchun)
    await queryInterface.addIndex("cart", ["product_id", "product_type"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cart");
    await queryInterface.dropTable("cars");
    await queryInterface.dropTable("users");
  },
};
