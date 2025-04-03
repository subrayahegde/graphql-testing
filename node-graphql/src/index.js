//console.log("hello world")

// src/index.js
require("dotenv").config()

const CovidActNowAPI = require("./datasources/CovidActNowAPI")
const { ApolloServer } = require("apollo-server")
const resolvers = require("./resolvers")
const typeDefs = require("./schema")

const server = new ApolloServer({ dataSources: () => ({
    covidApi: new CovidActNowAPI()
  }),
  typeDefs,
  resolvers
})

const port = process.env.port || 9000

console.log("key:" + process.env.COVID_ACT_NOW);    

server.listen(port).then(() => {
  console.log(`server running 🚀 http://localhost:${port}`)
})

