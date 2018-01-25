import { getAllUsers } from './db'
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type User {
    id: Int!
    name: String
  }

  # the schema allows the following query:
  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: () => getAllUsers()
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema
