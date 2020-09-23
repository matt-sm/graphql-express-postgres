import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
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

app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({ schema, context: req.context })))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(4000, console.log('Listening on port 4000'))
// eslint-disable-line
