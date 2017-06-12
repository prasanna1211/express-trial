var express = require('express');
var graphqlHTTP = require('express-graphql');
var schema = require('./userInfo').default;

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000);
console.log(' running a graphql API server at localhost:4000/graphql');
