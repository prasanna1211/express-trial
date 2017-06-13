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

const RepoInfoType = new GraphQLObjectType({
  name: "RepoInfo",
  description: "Owner information on a repo",
  fields: () => ({
    "login": { type: GraphQLString },
    "id": { type: GraphQLInt },
  })
});


function usersFollowing() {
  return {
      type: new GraphQLList(RepoInfoType),
      description: "Fields about the people you this person follows",
      resolve: (obj) => {
        const brackIndex = obj.following_url.indexOf('{'),
        url =  obj.following_url.slice(0, brackIndex);
        return axios.get(url)
          .then(function(response) {
            return response.data;
          });
      }
  };
}

const userInfoType = new GraphQLObjectType({
  name: 'userInfo',
  description: 'Basic information on github user',
  fields: () => ({
    "login": { type: GraphQLString },
    "id": { type: GraphQLInt },
    avatar_url: { type: GraphQLString },
    site_admin: { type: GraphQLInt },
    users_following: usersFollowing(),
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
          .then(response => response.data);
      }
    }
  })
});

const schema = new GraphQLSchema({
 query
});
export default schema;
