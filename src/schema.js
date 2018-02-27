import { User, Post, Comment } from './db'
import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const typeDefs = importSchema('./schema/schema.graphql')
const saltRounds = 10

const resolvers = {
  Query: {
    Me: (parent, args, { context }, info) => {
      if (context && context.user) {
        return context.user
      } else {
        throw new Error('User is not logged in (or authenticated).')
      }
    }
  },
  User: {
    Posts: async user => {
      return await Post.query().where({ author_id: user.id })
    }
  },
  Post: {
    User: async post => {
      return await User.query().findOne({ id: post.author_id })
    },
    Comments: async post => {
      return await Comment.query().where({ post_id: post.id })
    }
  },
  Mutation: {
    createToken: async (parent, { email, password }) => {
      const user = await User.query().findOne({ email: email })
      if (user && (await bcrypt.compare(password, user.password))) {
        return jwt.sign({ sub: user.email }, 'shhhhhhared-secret')
      }

      throw new Error('Invalid email or password.')
    },
    addUser: async (parent, { name, email, password }) => {
      const current_user = await User.query().findOne({ email: email })
      if (current_user) {
        throw new Error(`User ${email} already exists.`)
      }

      const hash = await bcrypt.hash(password, saltRounds)
      const user = await User.query().insert({ name: name, email: email, password: hash })
      return user
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
