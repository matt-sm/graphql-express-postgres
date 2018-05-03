# graphql-express-postgres [![Build Status](https://travis-ci.org/matt-sm/graphql-express-postgres.svg?branch=master)](https://travis-ci.org/matt-sm/graphql-express-postgres) [![Coverage Status](https://coveralls.io/repos/github/matt-sm/graphql-express-postgres/badge.svg?branch=master)](https://coveralls.io/github/matt-sm/graphql-express-postgres?branch=master)
A reference graphql api built with node and postgres.

The schema follows the classic user, posts, comments structure.  

- Uses [Apollo Server](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express)
- Examples of sql query caching using [data loader](https://github.com/facebook/dataloader)
- Schema definitions are built using [graphql-tools](https://github.com/apollographql/graphql-tools). 
- Data access built on the [Objection](https://github.com/Vincit/objection.js/) ORM and [knex](https://github.com/tgriesser/knex).
- Authentication handled by [express-jwt](https://github.com/auth0/express-jwt) middleware.  
- For protected resolvers simply wrap the function in `authenticated()`. 
- Tests use [jest](https://github.com/facebook/jest) and execute against a database instance seeded with test data.
## Install:
- run locally with nodemon + babel: `npm run dev`
- build and run on a server: `npm start`
- db migrations: `npm run migrate`
- format code: `npm run prettier`
- lint code: `npm run eslint`
- tests: `createdb blog-test` then `npm test`

## Samples
### Queries
```
{
  viewer {
    email
    posts {
      title
      comments {
        body
      }
    }   
  }
}
```
### Mutations
```
mutation{addUser(name:"User", email:"user@test.com", password:"password") }
mutation{createToken(email:"user@test.com", password:"password") }
```
## Database
### Manually run the migrations/seeds
```
createdb blog-test
./node_modules/.bin/babel-node ./node_modules/.bin/knex migrate:latest --env test
./node_modules/.bin/babel-node ./node_modules/.bin/knex seed:run --env test
```
## Prior Art:
- express/babel setup: [https://github.com/vmasto/express-babel](https://github.com/vmasto/express-babel)
- knex ideas: [https://github.com/dYale/knexBlogBackend](https://github.com/dYale/knexBlogBackend)
- graphql schema: [https://github.com/mrblueblue/graphql-express-sqlite](https://github.com/mrblueblue/graphql-express-sqlite)
- authentication: [https://scaphold.io/community/blog/authentication-in-graphql/](https://scaphold.io/community/blog/authentication-in-graphql/)
- data loader: [https://spin.atomicobject.com/2017/05/15/optimize-graphql-queries/]
