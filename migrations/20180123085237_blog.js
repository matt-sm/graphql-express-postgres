export const up = async knex => {
  await knex.schema.createTable('user', table => {
    table.increments('id').primary()
    table.string('username')
    table.string('password')
    table.string('name')
    table.string('email')
    table.timestamps()
  })

  await knex.schema.createTable('post', table => {
    table.increments('id').primary()
    table.string('title')
    table.string('body')
    table
      .integer('author_id')
      .references('id')
      .inTable('user')
    table.dateTime('postDate')
  })

  return knex.schema.createTable('comment', table => {
    table.increments('id').primary()
    table.string('body')
    table
      .integer('author_id')
      .references('id')
      .inTable('user')
    table
      .integer('post_id')
      .references('id')
      .inTable('post')
    table.dateTime('postDate')
  })
}

export const down = async knex => {
  await knex.schema.dropTable('comment')
  await knex.schema.dropTable('post')
  return knex.schema.dropTable('user')
}
