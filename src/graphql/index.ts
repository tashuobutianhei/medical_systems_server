import {GraphQLSchema, GraphQLObjectType} from 'graphql';
import hosipatalInfo from './info';

const {ApolloServer, gql} = require('apollo-server-koa');

// 总查询对象
const queryObj = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    Info: hosipatalInfo,
  }),
});

// 总体变更对象
// let mutationObj = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: () => ({
//       postLogin: postLogin
//   }),
// });

// GraphQL总表
export const schema = new GraphQLSchema({
  query: queryObj,
  // mutation: mutationObj,
});

export const graphql = new ApolloServer({schema});
