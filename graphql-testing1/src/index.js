const { ApolloServer } = require ('@apollo/server');
const { startStandaloneServer } = require ('@apollo/server/standalone');
const fs = require ('fs');
const path = require ('path');

const { fileURLToPath } = require ('url');
const { resolvers } = require ('./resolvers');

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers
})

const { url }  = startStandaloneServer(server, {
  listen: { port: 4000 },
});

//console.log(`🚀  Server ready at: ${myUrl.host}`);
console.log(`🚀  Server ready at: http://localhost:4000`);
