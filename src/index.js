import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'
import db, { User } from './db'
import morgan from 'morgan'
import jwt from 'express-jwt'

const app = express()

app.use(morgan('tiny'))
app.use(
  '/graphql',
  jwt({
    secret: 'secret',
    requestProperty: 'auth',
    credentialsRequired: false
  })
)

app.use('/graphql', async (req, res, next) => {
  if (req.auth) {
    const user = await User.query().findById(req.auth.sub)
    req.context = {
      user
    }
  }
  next()
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)

app.listen(4000)
console.log('Listening on port 4000')
