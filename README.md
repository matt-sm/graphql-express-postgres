# graphql-express-postgres
An experimental graphql api.

Notes:
- express/babel setup from [https://github.com/vmasto/express-babel](https://github.com/vmasto/express-babel)
- knex ideas from [https://github.com/dYale/knexBlogBackend](https://github.com/dYale/knexBlogBackend)
- graphql schema from [https://github.com/mrblueblue/graphql-express-sqlite](https://github.com/mrblueblue/graphql-express-sqlite)
- authentication from [https://scaphold.io/community/blog/authentication-in-graphql/](https://scaphold.io/community/blog/authentication-in-graphql/)

Install:
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
```
./node_modules/.bin/babel-node ./node_modules/.bin/knex migrate:latest --env test
./node_modules/.bin/knex seed:run --env test
```
## Tests
```
createdb blog-test
npm run test
```
