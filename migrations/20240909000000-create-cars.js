/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create users table
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

    // Create cars table
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
    // Create commerce_cars table
    const bodyOfCar = [
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
      "city-car",
    ];

    await queryInterface.createTable("commerce_cars", {
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
        type: Sequelize.ENUM(...bodyOfCar),
      },
      statement: {
        type: Sequelize.ENUM("used", "new"),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

    // Create cart table
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
      product_type: {
        type: Sequelize.ENUM("car", "motorcycle"),
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

    // Create motorcycles table
    const motorcycleTypes = [
      "cruiser",
      "sport",
      "touring",
      "standard",
      "dual-sport",
      "dirt-bike",
      "naked-bike",
      "scooter",
      "adventure",
      "bobber",
      "cafe-racer",
      "chopper",
    ];

    await queryInterface.createTable("motorcycles", {
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
      engine: {
        type: Sequelize.ENUM("petrol", "electric", "hybrid"),
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
        type: Sequelize.ENUM("chain", "belt", "shaft"),
        allowNull: false,
      },
      transmission: {
        type: Sequelize.ENUM("manual", "automatic"),
        allowNull: false,
      },
      body: {
        type: Sequelize.ENUM(...motorcycleTypes),
      },
      condition: {
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

    // Create messages table
    await queryInterface.createTable("messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sender_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      receiver_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING(1000),
      },
      status: {
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
    //Create news table
    await queryInterface.createTable("news", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(100),
        defaultValue: "admin",
      },
      image: {
        type: Sequelize.STRING,
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
    //Create mark table
    await queryInterface.createTable("car_mark", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mark_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: { type: Sequelize.STRING, allowNull: false },
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
    //create table chat
    await queryInterface.createTable("chats", {
      chat_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      chat_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
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
      mute_type: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("messages");
    await queryInterface.dropTable("motorcycles");
    await queryInterface.dropTable("cart");
    await queryInterface.dropTable("cars");
    await queryInterface.dropTable("commerce_cars");
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("news");
    await queryInterface.dropTable("car_mark");
    await queryInterface.dropTable("chats");
  },
};
