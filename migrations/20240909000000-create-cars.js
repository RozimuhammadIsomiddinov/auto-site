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
    // Create cars table
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
        type: Sequelize.ENUM("AWD", "FWD"),
        allowNull: false,
      },
      checkpoint: {
        type: Sequelize.ENUM("automatic", "manual"),
        allowNull: false,
      },
      doors: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 4,
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
      mark: {
        type: Sequelize.ENUM(
          "BMW",
          "Baic",
          "Byd",
          "Bently",
          "Chery",
          "Cadillac",
          "Changan",
          "Chevrolet",
          "Citroen",
          "Daewoo",
          "Datsun",
          "Dodge",
          "Exeed",
          "Ferrari",
          "Ford",
          "Fiat",
          "GMC",
          "Geely",
          "Genesis",
          "Honda",
          "Hummer",
          "Hyundai",
          "Infiniti",
          "Isuzu",
          "Jaguar",
          "Jeep",
          "Kia",
          "Lamborghini",
          "Lancia",
          "Land Rover",
          "Lexus",
          "Lincoln",
          "Maserati",
          "Mazda",
          "McLaren",
          "Mercedes-Benz",
          "Mini",
          "Mitsubishi",
          "Nissan",
          "Opel",
          "Peugeot",
          "Porsche",
          "Renault",
          "Rolls-Royce",
          "Saab",
          "Seat",
          "Skoda",
          "Subaru",
          "Suzuki",
          "Tesla",
          "Toyota",
          "Volkswagen",
          "Volvo"
        ),
        allowNull: false,
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
        type: Sequelize.ENUM("AWD", "FWD"),
        allowNull: false,
      },
      checkpoint: {
        type: Sequelize.ENUM("automatic", "manual"),
        allowNull: false,
      },
      doors: {
        type: Sequelize.INTEGER,
        defaultValue: 4,
      },
      body: {
        type: Sequelize.ENUM(...bodyOfCar),
        allowNull: false,
      },
      statement: {
        type: Sequelize.ENUM("used", "new"),
        allowNull: false,
        defaultValue: "new",
      },
      description: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
      mark: {
        type: Sequelize.ENUM(
          "BMW",
          "Baic",
          "Byd",
          "Bently",
          "Chery",
          "Cadillac",
          "Changan",
          "Chevrolet",
          "Citroen",
          "Daewoo",
          "Datsun",
          "Dodge",
          "Exeed",
          "Ferrari",
          "Ford",
          "Fiat",
          "GMC",
          "Geely",
          "Genesis",
          "Honda",
          "Hummer",
          "Hyundai",
          "Infiniti",
          "Isuzu",
          "Jaguar",
          "Jeep",
          "Kia",
          "Lamborghini",
          "Lancia",
          "Land Rover",
          "Lexus",
          "Lincoln",
          "Maserati",
          "Mazda",
          "McLaren",
          "Mercedes-Benz",
          "Mini",
          "Mitsubishi",
          "Nissan",
          "Opel",
          "Peugeot",
          "Porsche",
          "Renault",
          "Rolls-Royce",
          "Saab",
          "Seat",
          "Skoda",
          "Subaru",
          "Suzuki",
          "Tesla",
          "Toyota",
          "Volkswagen",
          "Volvo"
        ),
        allowNull: false,
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
          model: "users", // Table name for users
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

    // Creating index on product_id and product_type for performance
    await queryInterface.addIndex("cart", ["product_id", "product_type"]);
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

    const motorcycleBrands = [
      "Harley-Davidson",
      "Ducati",
      "Yamaha",
      "Kawasaki",
      "BMW",
      "Suzuki",
      "Honda",
      "Triumph",
      "KTM",
      "Aprilia",
      "Indian",
      "Royal Enfield",
      "Moto Guzzi",
      "MV Agusta",
      "Bajaj",
      "Benelli",
      "Husqvarna",
      "CFMoto",
      "Norton",
      "Vespa",
    ];

    await queryInterface.createTable("motorcycles", {
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
        type: Sequelize.ENUM("petrol", "electric", "hybrid"),
        allowNull: false,
        defaultValue: "petrol",
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
        defaultValue: "chain",
      },
      transmission: {
        type: Sequelize.ENUM("manual", "automatic"),
        allowNull: false,
        defaultValue: "manual",
      },
      body: {
        type: Sequelize.ENUM(...motorcycleTypes),
        allowNull: false,
      },
      condition: {
        type: Sequelize.ENUM("used", "new"),
        allowNull: false,
        defaultValue: "used",
      },
      description: {
        type: Sequelize.STRING,
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
      mark: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      model: {
        type: Sequelize.ENUM(...motorcycleBrands),
        allowNull: false,
      },
      seen: {
        type: Sequelize.INTEGER,
      },
      liked: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      receiver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      message: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
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
      vehicle: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      create_at: {
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

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_cart_product_type";'
    );

    await queryInterface.dropTable("cars");
    await queryInterface.dropTable("commerce_cars");
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("news");
    await queryInterface.dropTable("car_mark");
    await queryInterface.dropTable("chats");
  },
};
