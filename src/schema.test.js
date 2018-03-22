import { resolvers } from './schema'
import { db } from './db'

beforeAll(async () => {
  await db.migrate.latest()
})

afterAll(async () => {
  await db.migrate.rollback()
  await db.destroy()
})

beforeEach(async () => {
  await db.seed.run()
})

test('root resolver returns context user', () => {
  const user = { email: 'user@test.com' }
  expect(resolvers.Query.viewer(null, null, { context: { user } })).toBe(user)
})

test('root resolver throws when invalid context', () => {
  expect(() => resolvers.Query.viewer(null, null, {})).toThrowError('User is not authenticated')
})

test('post.user returns single user', async () => {
  expect(await resolvers.Post.user({ author_id: 1 })).toHaveProperty('email', 'user@test.com')
})

test('post.comments returns comments for post', async () => {
  const expected = [{ author_id: 1, body: 'comment body', id: 1, postDate: null, post_id: 1 }]
  expect(await resolvers.Post.comments({ id: 1 })).toEqual(expected)
})

test('user.posts returns posts', async () => {
  const expected = [{ author_id: 1, body: 'post body', id: 1, postDate: null, title: 'post title' }]
  expect(await resolvers.User.posts({ id: 1 }, {})).toEqual(expected)
})

test('createToken does not throw when valid credentials', async () => {
  expect(await resolvers.Mutation.createToken(null, { email: 'user@test.com', password: 'password' })).not.toBeNull()
})

test('createToken throws when invalid password', async () => {
  expect.assertions(1)
  await expect(
    resolvers.Mutation.createToken(null, { email: 'user@test.com', password: 'invalid' })
  ).rejects.toMatchObject({
    message: 'Invalid email or password.'
  })
})

test('createToken throws when invalid email', async () => {
  expect.assertions(1)
  await expect(
    resolvers.Mutation.createToken(null, { email: 'user2@test.com', password: 'password' })
  ).rejects.toMatchObject({
    message: 'Invalid email or password.'
  })
})

test('addUser throws when duplicate email', async () => {
  expect.assertions(1)
  await expect(
    resolvers.Mutation.addUser(null, { name: '', email: 'user@test.com', password: '' })
  ).rejects.toMatchObject({
    message: 'User user@test.com already exists.'
  })
})
