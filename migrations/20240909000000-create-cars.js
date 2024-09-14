/** @type {import('sequelize-cli').Migration} */

export const up = async (queryInterface, Sequelize) => {
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

  await queryInterface.createTable("cars", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
    fuel: {
      type: Sequelize.ENUM("petrol", "electric", "hybrid", "dizel"),
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
      references: {
        model: "cars",
        key: "id",
      },
      onDelete: "CASCADE",
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
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("cart");
  await queryInterface.dropTable("cars");
  await queryInterface.dropTable("users");
};
