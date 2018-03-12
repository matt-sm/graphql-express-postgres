# graphql-express-postgres [![Build Status](https://travis-ci.org/matt-sm/graphql-express-postgres.svg?branch=master)](https://travis-ci.org/matt-sm/graphql-express-postgres)
An experimental graphql api.

The schema follows the classic user, posts, comments structure.  Schema definitions are built using `graphql-tools`. 

Authentication uses `express-jwt`.  For protected resolvers simply wrap the function in `authenticated()`. 

Tests use jest and execute against a database instance seeded with test data.
## Install:
- run locally with nodemon + babel: `npm run dev`
- build and run on a server: `npm start`
- db migrations: `npm run migrate`
- format code: `npm run prettier`

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
### Run test migrations/seeds
```
createdb blog-test
./node_modules/.bin/babel-node ./node_modules/.bin/knex migrate:latest --env test
./node_modules/.bin/knex seed:run --env test
```
## Prior Art:
- express/babel setup: [https://github.com/vmasto/express-babel](https://github.com/vmasto/express-babel)
- knex ideas: [https://github.com/dYale/knexBlogBackend](https://github.com/dYale/knexBlogBackend)
- graphql schema: [https://github.com/mrblueblue/graphql-express-sqlite](https://github.com/mrblueblue/graphql-express-sqlite)
- authentication: [https://scaphold.io/community/blog/authentication-in-graphql/](https://scaphold.io/community/blog/authentication-in-graphql/)
