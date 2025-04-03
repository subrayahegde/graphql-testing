const { GraphQLList, GraphQLInt, GraphQLString } = require("graphql");
const { userType, userDetailstype } = require("../TypeDefs/userType");
const { STATUStype } = require("../TypeDefs/statusType");

// Add user controller
module.exports.AddUser = {
  type: STATUStype,
  args: {
    username: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    gender: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    let { dbConfig } = parent;
    await dbConfig.user_details.create({
      username: args.username,
      first_name: args.first_name,
      last_name: args.last_name,
      gender: args.gender,
      password: args.password,
    });
    console.log(args);
    return {
      status: "success",
      message: "User created",
      error: "",
    };
  },
};

// Update user controller
module.exports.UPDATE_USER = {
  type: STATUStype,
  args: {
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    gender: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    let { dbConfig } = parent;
    await dbConfig.user_details.update(
      {
        username: args.username,
        first_name: args.first_name,
        last_name: args.last_name,
        gender: args.gender,
        password: args.password,
      },
      {
        where: { id: args.id },
      }
    );
    return {
      status: "success",
      message: "Update successfully",
      error: "",
    };
  },
};

// delete user controller
module.exports.DELELE_USER = {
  type: STATUStype,
  args: {
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    gender: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    let { dbConfig } = parent;
    await dbConfig.user_details.destroy({
      where: { id: args.id },
    });
    return {
      status: "success",
      message: "deleted successfully",
      error: "",
    };
  },
};
