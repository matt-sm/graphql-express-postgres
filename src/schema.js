import { User } from './db'
import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const typeDefs = importSchema('./schema/schema.graphql')

const resolvers = {
  Query: {
    me: (parent, args, { context }, info) => {
      if (context.user) {
        return context.user
      }
      throw new Error('User is not logged in (or authenticated).')
    }
  },
  Mutation: {
    createToken: async (parent, { email, password }) => {
      const user = await User.query().findOne({ email: email })
      if (user && (await bcrypt.compare(password, user.password))) {
        return jwt.sign({ sub: user.email }, 'shhhhhhared-secret')
      }

      throw new Error('Invalid email or password.')
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
