const Sequelize = require("sequelize");

const sequelize = new Sequelize("graphqldb2", "root", "Password123#", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("server connected");
  })
  .catch((err) => {
    console.log(`Error occured ${err}`);
  });

module.exports = sequelize;
