import { User } from './db'
import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import'

const typeDefs = importSchema('./schema/schema.graphql')

const resolvers = {
  Query: {
    users: () => User.query()
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
