import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import findCommentsLoader from './loaders'
import { User, Post, Comment } from './db'

const typeDefs = importSchema('./schema/schema.graphql')
const saltRounds = 10

const authenticated = fn => (parent, args, context, info) => {
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

      return query
    },
    comments: async user => Comment.query().where({ author_id: user.id })
  },
  Post: {
    user: async post => User.query().findOne({ id: post.author_id }),
    comments: async post => findCommentsLoader.load(post)
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
      const currentUser = await User.query().findOne({ email })
      if (currentUser) {
        throw new Error(`User ${email} already exists.`)
      }

      const hash = await bcrypt.hash(password, saltRounds)
      return User.query().insert({ name, email, password: hash })
    },
    addPost: authenticated(async (parent, { title, body }, context) =>
      Post.query().insert({ title, body, author_id: context.user.id })
    ),
    addComment: authenticated(async (parent, args, context) =>
      Comment.query().insert({ body: args.body, post_id: args.post_id, author_id: context.user.id })
    )
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
