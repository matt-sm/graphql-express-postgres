import express from 'express'
import graphqlHTTP from 'express-graphql'
import morgan from 'morgan'
import jwt from 'express-jwt'
import schema from './schema'
import { User } from './db'

const app = express()

app.use(morgan('tiny'))
app.use(
  '/graphql',
  jwt({
    secret: 'shhhhhhared-secret',
    requestProperty: 'auth',
    credentialsRequired: false
  })
)

app.use('/graphql', async (req, res, next) => {
  if (req.auth) {
    const user = await User.query().findOne({ email: req.auth.sub })
    req.context = {
      user
    }
  }
  next()
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.listen(4000)
console.log('Listening on port 4000') // eslint-disable-line
