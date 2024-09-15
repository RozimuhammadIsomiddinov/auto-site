const sequelize = require("./config/dbconfig.js");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Tables have been created.");
  })
  .catch((err) => {
    console.error("Unable to create tables:", err);
  });
