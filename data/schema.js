var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLFloat = require('graphql').GraphQLFloat;

var query = new GraphQLObjectType({
  name: 'Query',
  description: 'First GraphQL Yay!',
  fields: () => ({
    hello: {
      type: GraphQLString,
      description: "Accepts a name so you can be nice and say hi",
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Name you want to say hi',
        }
      },
      resolve: (_,args) => {
        return `Hello, ${args.name}!!!`;
      }
    },
    luckyNumber: {
      type: GraphQLInt,
      description: "A lucky number",
      resolve: () => {
        return 888;
      }
    }
  })
});

const schema = new GraphQLSchema({
 query
});
export default schema;
