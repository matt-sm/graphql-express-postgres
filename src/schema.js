import { User, Post, Comment } from './db'
import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const typeDefs = importSchema('./schema/schema.graphql')
const saltRounds = 10

const authenticated = fn => (parent, args, { context }, info) => {
  if (context && context.user) {
    return fn(parent, args, context, info)
  }
  throw new Error('User is not authenticated')
}

export const resolvers = {
  Query: {
    viewer: authenticated((parent, args, context) => context.user)
  },
  User: {
    posts: async (user, args) => {
      const query = Post.query().where({ author_id: user.id })

      if (args.id) {
        query.where({ id: args.id })
      }

      return await query
    },
    comments: async user => await Comment.query().where({ author_id: user.id })
  },
  Post: {
    user: async post => await User.query().findOne({ id: post.author_id }),
    comments: async post => await Comment.query().where({ post_id: post.id })
  },
  Mutation: {
    createToken: async (parent, { email, password }) => {
      const user = await User.query().findOne({ email })
      if (user && (await bcrypt.compare(password, user.password))) {
        return jwt.sign({ sub: user.email }, 'shhhhhhared-secret')
      }

      throw new Error('Invalid email or password.')
    },
    addUser: async (parent, { name, email, password }) => {
      const current_user = await User.query().findOne({ email })
      if (current_user) {
        throw new Error(`User ${email} already exists.`)
      }

      const hash = await bcrypt.hash(password, saltRounds)
      return await User.query().insert({ name, email, password: hash })
    },
    addPost: authenticated(
      async (parent, { title, body }, context) => await Post.query().insert({ title, body, author_id: context.user.id })
    ),
    addComment: authenticated(
      async (parent, { body, post_id }, context) =>
        await Comment.query().insert({ body, post_id, author_id: context.user.id })
    )
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
