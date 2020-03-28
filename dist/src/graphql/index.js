"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var info_1 = __importDefault(require("./info"));
var _a = require('apollo-server-koa'), ApolloServer = _a.ApolloServer, gql = _a.gql;
// 总查询对象
var queryObj = new graphql_1.GraphQLObjectType({
    name: 'query',
    fields: function () { return ({
        Info: info_1.default,
    }); },
});
// 总体变更对象
// let mutationObj = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: () => ({
//       postLogin: postLogin
//   }),
// });
// GraphQL总表
exports.schema = new graphql_1.GraphQLSchema({
    query: queryObj,
});
exports.graphql = new ApolloServer({ schema: exports.schema });
