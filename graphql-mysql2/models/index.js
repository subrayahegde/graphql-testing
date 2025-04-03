const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config.js/db");
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("yes sync");
  })
  .catch((e) => {
    console.log(`something went wrong ${e}`);
  });

db.user_details = require("../models/Users")(sequelize, DataTypes);

module.exports = db;
