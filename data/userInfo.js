var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLFloat = require('graphql').GraphQLFloat;
import axios from 'axios';

const userInfoType = new GraphQLObjectType({
  name: 'userInfo',
  description: 'Basic information on github user',
  fields: () => ({
    "login": { type: GraphQLString },
    "id": { type: GraphQLInt },
    avatar_url: { type: GraphQLString },
    site_admin: { type: GraphQLInt },
    following_url: {
      type: GraphQLString,
      resolve: (obj) => {
        const brackIndex = obj.following_url.indexOf('{');
        return obj.following_url.slice(0, brackIndex);
      }
    }
  }),
})

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Server Config',
  fields: () => ({
    githubUser: {
      type: userInfoType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        }
      },
      resolve: (_, {username}) => {
        const url = `https://api.github.com/users/${username}`;
        return axios.get(url)
          .then(function(response) {
            return response.data;
          });
      }
    }
  })
});

const schema = new GraphQLSchema({
 query
});
export default schema;
