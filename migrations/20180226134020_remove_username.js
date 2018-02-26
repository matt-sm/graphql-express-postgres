exports.up = async (knex, Promise) => {
  return await knex.schema.table('user', table => {
    table.dropColumn('username')
  })
}

exports.down = async (knex, Promise) => {
  return await knex.schema.table('user', table => {
    table.string('username')
  })
}
