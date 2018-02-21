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
    secret: 'shhhhhhared-secret',
    requestProperty: 'auth',
    credentialsRequired: false
  })
)

app.use('/graphql', (req, res, done) => {
  const user = req.auth && User.get(req.auth.sub)
  req.context = {
    user: user
  }
  done()
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
