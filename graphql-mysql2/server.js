const express = require("express");

const app = express();
const PORT = 3000;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schema/index");

require("./models");
app.use(express.json());
const db = require("./models");
// const User = db.user_details;
var root = {
  accessKey: 123456,
  dbConfig: db,
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`App is listing on ${PORT}`);
});
