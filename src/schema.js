import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql'
import { getAllUsers } from 'db'

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'a user',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'user id'
    },
    name: {
      type: GraphQLString,
      description: 'user name'
    }
  })
})

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world'
      },
      users: {
        type: new GraphQLList(userType),
        resolve: getAllUsers
      }
    }
  })
})

export default Schema
