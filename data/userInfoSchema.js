import {
 GraphQLSchema,
 GraphQLObjectType,
 GraphQLInt,
 GraphQLString,
 GraphQLList,
 GraphQLNonNull,
 GraphQLID,
 GraphQLBoolean,
 GraphQLFloat
} from 'graphql';

import axios from 'axios';

const followerDetail = new GraphQLObjectType({
  name: 'followerDetail',
  fields: () => ({
    login: {
      type: GraphQLString,
      resolve: ({login}) => {
        return login;
      }
    },
  })
});

const userInfoType = new GraphQLObjectType({
  name: 'UserInfo',
  description: 'Basic information on a GitHub user',
  fields: () => ({
    login: {
      type: GraphQLString,
      resolve: ({login}) => {
        return login;
      }
    },
    id: { type: GraphQLInt },
    followersUrl: {
      type: new GraphQLList(followerDetail),
      resolve: ({ followers_url }) => {
        return axios.get(followers_url)
          .then(response => response.data);
      }
    }
  })
});


const query = new GraphQLObjectType({
  name: 'Query',
  description: 'First GraphQL Server Config Yay!',
  fields: () => ({
    githubUser: {
      type: userInfoType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, {username}) => {
        const url = `https://api.github.com/users/${username}`;
        return axios.get(url)
          .then(response => response.data);
      }
    },
  })
});

const schema = new GraphQLSchema({
  query,
})

export default schema;
