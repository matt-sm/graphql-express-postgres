import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'
import db from './db'

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)

app.listen(4000)
console.log('Listening on port 4000')
