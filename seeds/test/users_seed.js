exports.seed = async (knex, Promise) => {
  await knex('user').del()

  return knex('user').insert([
    {email: 'user@test.com', password: '$2a$10$WEG6o/BJE6k.TAPc.g8HJue39EcXxnwahHnxWVqaKk2.Fjx06xdWu'}
  ]);
};
