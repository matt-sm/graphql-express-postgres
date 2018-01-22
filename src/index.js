var express = require('express');  
var app = express();  
var db  = require('./db');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var port = 4000;

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port);  
console.log("Listening on port", port);  