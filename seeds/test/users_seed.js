exports.seed = async (knex, Promise) => {
  await knex.schema.raw('truncate table "user" restart identity cascade;')

  await knex('user').insert([
    {email: 'user@test.com', password: '$2a$10$WEG6o/BJE6k.TAPc.g8HJue39EcXxnwahHnxWVqaKk2.Fjx06xdWu'}
  ]);
  await knex('post').insert([
    {title: 'post title', body: 'post body', author_id: 1}
  ]);
  return await knex('comment').insert([
    {body: 'comment body', post_id: 1, author_id: 1}
  ]);
};
