// const { sequelize } = require(".");

module.exports = (sequelize, Datatypes) => {
  const Users = sequelize.define("user_details", {
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: Datatypes.STRING,
    first_name: Datatypes.STRING,
    last_name: Datatypes.STRING,
    gender: Datatypes.STRING,
    password: Datatypes.STRING,
  });

  return Users;
};
