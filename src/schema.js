import { User } from './db'
import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import'

const typeDefs = importSchema('./schema/schema.graphql')

const resolvers = {
  Query: {
    me: (parent, args, { context }, info) => {
      if (context.user) {
        return context.user
      }
      throw new Error('User is not logged in (or authenticated).')
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
