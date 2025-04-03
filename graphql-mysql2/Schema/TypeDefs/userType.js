const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = graphql;

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    user_id: { type: GraphQLString },
    username: { type: GraphQLString },
    first_name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    gender: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const userDetailstype = new GraphQLObjectType({
  name: "all_user",
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    gender: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

module.exports = { userType, userDetailstype };
