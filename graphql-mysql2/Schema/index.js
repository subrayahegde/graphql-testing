const graphql = require("graphql");
const { USER_LIST, USER_DETAIL } = require("./Queries/User");
const { AddUser, UPDATE_USER, DELELE_USER } = require("./Mutations/User");

const { GraphQLObjectType, GraphQLSchema } = graphql;

// Get all the user
const rootQuery = new GraphQLObjectType({
  name: "xyz",
  fields: {
    AllUser: USER_LIST,
    userDetail: USER_DETAIL,
  },
});

// Add new user to database
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: AddUser,
    updateUser: UPDATE_USER,
    deleteUser: DELELE_USER,
  },
});

module.exports = new GraphQLSchema({ query: rootQuery, mutation: Mutation });
