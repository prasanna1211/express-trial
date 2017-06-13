var express = require('express');
var graphqlHTTP = require('express-graphql');
import userInfoSchema from './userInfoSchema';

var app = express();

app.use('/fetchUserData', graphqlHTTP({
  schema: userInfoSchema,
  graphiql: true,
}));

app.listen(4000);

console.log(' running a graphql API server at localhost:4000/graphql');
