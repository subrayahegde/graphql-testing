const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;

const STATUStype = new GraphQLObjectType({
  name: "statusType",
  fields: () => ({
    status: { type: GraphQLString },
    message: { type: GraphQLString },
    error: { type: GraphQLString },
  }),
});

module.exports = { STATUStype };
