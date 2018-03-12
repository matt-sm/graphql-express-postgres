import { resolvers } from './schema'
import { db } from './db'

beforeEach(async () => {
  await db.migrate.latest()
  await db.seed.run()
})

test('root resolver returns context user', () => {
  const user = { email: 'user@test.com' }
  expect(resolvers.Query.viewer(null, null, { context: { user } })).toBe(user)
})

test('post.user returns single user', async () => {
  expect(await resolvers.Post.user({ author_id: 1 })).toHaveProperty('email', 'user@test.com')
})
