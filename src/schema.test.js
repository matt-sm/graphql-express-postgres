import { resolvers } from './schema'

test('view resolver returns context user', () => {
  const user = {email: 'user@test.com'}
  expect(resolvers.Query.viewer(null, null, {context: {user}})).toBe(user);
});