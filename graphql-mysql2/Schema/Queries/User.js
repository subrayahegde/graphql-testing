const { GraphQLList, GraphQLInt } = require("graphql");
const { userType, userDetailstype } = require("../TypeDefs/userType");
const db = require("../../models");
const User = db.user_details;
module.exports.USER_LIST = {
  type: new GraphQLList(userDetailstype),

  resolve(parent, args) {
    let { dbConfig } = parent;
    const data = dbConfig.user_details.findAll();
    return data;
  },
};

module.exports.USER_DETAIL = {
  type: new GraphQLList(userDetailstype),
  args: {
    id: { type: GraphQLInt },
  },
  resolve(parent, args) {
    console.log(args);
    let { dbConfig } = parent;
    const data = dbConfig.user_details.findAll({ where: { id: args.id } });
    return data;
  },
};
