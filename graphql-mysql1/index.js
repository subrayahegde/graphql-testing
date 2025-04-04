const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.use(cors())

const schema = buildSchema(`
  type User {
    id: String,
    name: String
    job_title: String
    email : String 
  }

  type Query {
    getUsers: [User],
    getUserInfo(id:Int) : User
  }

  type Mutation {
    updateUserInfo(id: Int, name: String, email: String, job_title: String): Boolean
    createUser(id: Int,name: String,email:String,job_title:String): Boolean
    deleteUser(id: Int): Boolean
  }

`)

// generic function to help query the database 

const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
  req.mysqlDb.query(sql, args, (err, rows) => {
    if (err)
      return reject(err);
    rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
  });
});

const root = {
  getUsers: (args, req) => queryDB(req, "select * from users").then(data => data),
  getUserInfo: (args, req) => queryDB(req, "select * from users where id = ?", [args.id]).then(data => data[0]),
  updateUserInfo: (args, req) => queryDB(req, "update users SET ? where id = ?", [args, args.id]).then(data => data),
  createUser: (args, req) => queryDB(req, "insert into users SET ?", args).then(data => data),
  deleteUser: (args, req) => queryDB(req, "delete from users where id = ?", [args.id]).then(data => data)
};


app.use((req, res, next) => {
  req.mysqlDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password123#',
    database: 'graphqldb1'
  });
  req.mysqlDb.connect();
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(2000);

console.log('Running a GraphQL API server at localhost:2000/graphql');
